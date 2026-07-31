import { http, HttpResponse } from "msw";
import { endPoint } from "../../settings.json";
import stories from "../data/stories";
import questions from "../data/questions";
import courses from "../data/courses";
import articles from "../data/articles";
import type Article from "../../types/article";
import sessions from "../data/sessions";
import type Session from "../../types/session";
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

  http.post(`${endPoint}/sessions`, async ({ request }) => {
    const body = (await request.json()) as Partial<Session>;
    const now = new Date().toISOString();

    if (!body.title || !body.slug) {
      return HttpResponse.json(
        { message: "title and slug are required." },
        { status: 400 },
      );
    }
    if (sessions.some((s) => s.slug === body.slug)) {
      return HttpResponse.json(
        { message: "A session with this slug already exists." },
        { status: 409 },
      );
    }

    const session: Session = {
      id: `session-${body.slug}-${Date.now()}`,
      type: "session",
      slug: body.slug,
      title: body.title,
      authorId: body.authorId ?? "user-tes-admin-1",
      status: body.status ?? "draft",
      visibility: body.visibility ?? "private",
      language: body.language ?? "ru",
      topicTags: body.topicTags ?? [],
      region: body.region,
      coverImage: body.coverImage,
      createdAt: now,
      updatedAt: now,
      publishedAt: body.status === "published" ? now : undefined,
      stats: { views: 0, likes: 0, comments: 0, saves: 0 },
      description: body.description ?? "",
      format: body.format ?? "online",
      sessionType: body.sessionType ?? "webinar",
      location: body.location,
      venueAddress: body.venueAddress,
      meetingUrl: body.meetingUrl,
      startsAt: body.startsAt ?? now,
      endsAt: body.endsAt ?? now,
      registrationClosesAt: body.registrationClosesAt,
      hostId: body.hostId ?? body.authorId ?? "user-tes-admin-1",
      capacity: body.capacity ?? 0,
      registeredCount: 0,
      pricing: body.pricing ?? {
        model: "free",
        currency: "KGS",
        hasDiscount: false,
        isRefundable: false,
      },
      agenda: body.agenda ?? [],
      materials: body.materials ?? [],
      surface: "sessions",
    };

    sessions.push(session);
    return HttpResponse.json(session, { status: 201 });
  }),

  http.patch<{ slug: string }>(
    `${endPoint}/sessions/:slug`,
    async ({ params, request }) => {
      const body = (await request.json()) as Partial<Session>;
      const session = sessions.find((s) => s.slug === params.slug);
      if (!session) {
        return HttpResponse.json({ message: "Not found." }, { status: 404 });
      }
      if (
        body.slug &&
        body.slug !== session.slug &&
        sessions.some((s) => s.slug === body.slug)
      ) {
        return HttpResponse.json(
          { message: "A session with this slug already exists." },
          { status: 409 },
        );
      }

      Object.assign(session, body);
      session.updatedAt = new Date().toISOString();
      if (body.status === "published" && !session.publishedAt) {
        session.publishedAt = session.updatedAt;
      }
      return HttpResponse.json(session);
    },
  ),

  http.patch<{ slug: string }>(
    `${endPoint}/sessions/:slug/status`,
    async ({ params, request }) => {
      const { status } = (await request.json()) as { status: string };
      const session = sessions.find((s) => s.slug === params.slug);
      if (!session) {
        return HttpResponse.json({ message: "Not found." }, { status: 404 });
      }
      session.status = status as Session["status"];
      if (status === "published") {
        session.publishedAt = new Date().toISOString();
      }
      session.updatedAt = new Date().toISOString();
      return HttpResponse.json(session);
    },
  ),

  http.post<{ slug: string }>(
    `${endPoint}/sessions/:slug/cancel`,
    ({ params }) => {
      const session = sessions.find((s) => s.slug === params.slug);
      if (!session) {
        return HttpResponse.json({ message: "Not found." }, { status: 404 });
      }
      session.isCanceled = true;
      session.updatedAt = new Date().toISOString();
      return HttpResponse.json(session);
    },
  ),

  http.post<{ slug: string }>(
    `${endPoint}/sessions/:slug/restore`,
    ({ params }) => {
      const session = sessions.find((s) => s.slug === params.slug);
      if (!session) {
        return HttpResponse.json({ message: "Not found." }, { status: 404 });
      }
      session.isCanceled = false;
      session.updatedAt = new Date().toISOString();
      return HttpResponse.json(session);
    },
  ),

  http.delete<{ slug: string }>(`${endPoint}/sessions/:slug`, ({ params }) => {
    const index = sessions.findIndex((s) => s.slug === params.slug);
    if (index === -1) {
      return HttpResponse.json({ message: "Not found." }, { status: 404 });
    }
    const [removed] = sessions.splice(index, 1);
    return HttpResponse.json(removed);
  }),

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
