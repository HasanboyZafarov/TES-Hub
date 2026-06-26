export default interface Lesson {
  id: string;
  title: string;
  order: number;
  type: "article" | "video" | "pdf" | "quiz" | "external_link";
  durationMinutes: number;
  isFreePreview: boolean;
//   content: LessonContent; // shape depends on type
}
