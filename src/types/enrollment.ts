export default interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessonIds: string[];
  completedAt?: string;
  certificateId?: string;
}
