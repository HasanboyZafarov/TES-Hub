export default interface Comment {
  id: string;
  contentId: string;
  parentId?: string; // set on replies; threads are one level deep
  authorId: string;
  body: string;
  createdAt: string;
  likes: number; // anonymous — liking just notifies the comment author
  isHidden: boolean;
  isAcceptedAnswer?: boolean; // for Q&A
  isExpertAnswer?: boolean;
}
