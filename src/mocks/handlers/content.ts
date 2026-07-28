import { http, HttpResponse } from "msw";
import { endPoint } from "../../settings.json";
import stories from "../data/stories";
import questions from "../data/questions";
import courses from "../data/courses";
import articles from "../data/articles";
import type Article from "../../types/article";
import sessions from "../data/sessions";
import comments from "../data/comments";

type ArticleInput = Pick<Article, "title" | "body" | "category"> &
  Partial<
    Pick<
      Article,
      | "slug"
      | "excerpt"
      | "topicTags"
      | "coverImage"
      | "status"
      | "authorId"
      | "language"
    >
  >;

const slugify = (title: string) =>
  title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

const readTime = (body: string) => {
  const words = body.replace(/<[^>]*>/g, " ").trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

const bySlug =
  <T extends { slug: string }>(list: T[]) =>
  ({ params }: { params: { slug: string } }) => {
    const item = list.find((i) => i.slug === params.slug);
    if (!item) {
      return HttpResponse.json({ message: "Not found." }, { status: 404 });
    }
    return HttpResponse.json(item);
  };

export const content_handlers = [
  // Community
  http.get(`${endPoint}/stories`, () => HttpResponse.json(stories)),
  http.get<{ slug: string }>(`${endPoint}/stories/:slug`, bySlug(stories)),

  http.get(`${endPoint}/questions`, () => HttpResponse.json(questions)),
  http.get<{ slug: string }>(`${endPoint}/questions/:slug`, bySlug(questions)),

  // Academy
  http.get(`${endPoint}/courses`, () => HttpResponse.json(courses)),
  http.get<{ slug: string }>(`${endPoint}/courses/:slug`, bySlug(courses)),

  http.get(`${endPoint}/articles`, () => HttpResponse.json(articles)),
  http.get<{ slug: string }>(`${endPoint}/articles/:slug`, bySlug(articles)),
  http.post(`${endPoint}/articles`, async ({ request }) => {
    const payload = (await request.json()) as ArticleInput;
    const now = new Date().toISOString();
    const slug = payload.slug || slugify(payload.title);

    if (articles.some((a) => a.slug === slug)) {
      return HttpResponse.json(
        { message: "An article with this slug already exists." },
        { status: 409 },
      );
    }

    const article: Article = {
      id: `article-${slug}`,
      type: "article",
      slug,
      title: payload.title,
      authorId: payload.authorId ?? "user-tes-author-1",
      status: payload.status ?? "draft",
      visibility: payload.status === "published" ? "public" : "private",
      language: payload.language ?? "en",
      topicTags: payload.topicTags ?? [],
      coverImage: payload.coverImage,
      createdAt: now,
      updatedAt: now,
      publishedAt: payload.status === "published" ? now : undefined,
      stats: { views: 0, likes: 0, comments: 0, saves: 0 },
      category: payload.category,
      body: payload.body,
      excerpt: payload.excerpt ?? "",
      readTimeMinutes: readTime(payload.body),
      pricing: {
        model: "free",
        currency: "KGS",
        hasDiscount: false,
        isRefundable: false,
      },
      surface: "academy",
      isVerifiedByTES: true,
    };

    articles.push(article);
    return HttpResponse.json(article, { status: 201 });
  }),
  http.put<{ slug: string }>(
    `${endPoint}/articles/:slug`,
    async ({ params, request }) => {
      const payload = (await request.json()) as ArticleInput;
      const article = articles.find((a) => a.slug === params.slug);
      if (!article) {
        return HttpResponse.json({ message: "Not found." }, { status: 404 });
      }

      const now = new Date().toISOString();

      article.title = payload.title;
      article.body = payload.body;
      article.category = payload.category;
      article.readTimeMinutes = readTime(payload.body);
      article.updatedAt = now;

      if (payload.excerpt !== undefined) article.excerpt = payload.excerpt;
      if (payload.topicTags) article.topicTags = payload.topicTags;
      if (payload.coverImage) article.coverImage = payload.coverImage;

      if (payload.status && payload.status !== article.status) {
        article.status = payload.status;
        if (payload.status === "published") {
          article.publishedAt = now;
          article.visibility = "public";
        }
      }

      return HttpResponse.json(article);
    },
  ),
  http.patch<{ slug: string }>(
    `${endPoint}/articles/:slug/status`,
    async ({ params, request }) => {
      const { status } = (await request.json()) as { status: string };
      const article = articles.find((a) => a.slug === params.slug);
      if (!article) {
        return HttpResponse.json({ message: "Not found." }, { status: 404 });
      }
      article.status = status as Article["status"];
      if (status === "published") {
        article.publishedAt = new Date().toISOString();
      }
      article.updatedAt = new Date().toISOString();
      return HttpResponse.json(article);
    },
  ),

  // Sessions
  http.get(`${endPoint}/sessions`, () => HttpResponse.json(sessions)),
  http.get<{ slug: string }>(`${endPoint}/sessions/:slug`, bySlug(sessions)),

  // Comments — ?contentId=<id> required
  http.get(`${endPoint}/comments`, ({ request }) => {
    const contentId = new URL(request.url).searchParams.get("contentId");
    if (!contentId) {
      return HttpResponse.json(
        { message: "contentId is required." },
        { status: 400 },
      );
    }
    return HttpResponse.json(comments.filter((c) => c.contentId === contentId));
  }),
];
