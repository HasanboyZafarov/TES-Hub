export default interface Comment {
  id: string;
  contentId: string;
  authorId: string;
  body: string;
  parentId?: string; // for replies
  createdAt: string;
  likes: number;
  isHidden: boolean;
  isAcceptedAnswer?: boolean; // for Q&A
  isExpertAnswer?: boolean;
}
