import { http, HttpResponse } from "msw";
import { endPoint } from "../../settings.json";
import stories from "../data/stories";
import questions from "../data/questions";
import courses from "../data/courses";
import articles from "../data/articles";
import type Article from "../../types/article";
import sessions from "../data/sessions";
import comments from "../data/comments";

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
