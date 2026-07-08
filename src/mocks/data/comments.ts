import type Comment from "../../types/comment";

// Flat comments only — no replying. Likes are anonymous counts; liking
// notifies the comment author server-side but no liker list is exposed.
const comments: Comment[] = [
  // On story-apple-orchard-frost-recovery
  {
    id: "comment-story-thanks",
    contentId: "story-apple-orchard-frost-recovery",
    authorId: "user-member-1",
    body: "This is exactly what happened to us too — trying the smudge pots next spring.",
    createdAt: "2026-05-21T08:00:00.000Z",
    likes: 14,
    isHidden: false,
  },
  {
    id: "comment-story-hidden-spam",
    contentId: "story-apple-orchard-frost-recovery",
    authorId: "user-member-1",
    body: "Buy cheap frost blankets at [link removed] best price!!!",
    createdAt: "2026-05-22T10:00:00.000Z",
    likes: 0, 
    isHidden: true,
  },

  // On question-rootstock-high-altitude (isSolved, acceptedAnswerId points here)
  {
    id: "comment-rootstock-accepted",
    contentId: "question-rootstock-high-altitude",
    authorId: "user-spac-consultant-1",
    body: "For 1800m+ with hard cold snaps, go with M111 or a seedling rootstock over M9 — better cold hardiness even though it's more vigorous than you'd want at lower elevation.",
    createdAt: "2026-06-11T09:00:00.000Z",
    likes: 47,
    isHidden: false,
    isAcceptedAnswer: true,
    isExpertAnswer: true,
  },

  // On question-old-silage-technique (archived, isSolved)
  {
    id: "comment-silage-accepted",
    contentId: "question-old-silage-technique",
    authorId: "user-spac-consultant-1",
    body: "Pits still work fine for small herds if you manage compaction and cover them properly — bunkers only start paying off past ~50 head.",
    createdAt: "2023-08-05T09:00:00.000Z",
    likes: 22,
    isHidden: false,
    isAcceptedAnswer: true,
    isExpertAnswer: true,
  },
];

export default comments;
