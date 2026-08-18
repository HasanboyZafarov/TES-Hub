export interface EnrollmentQuizState {
  bestScorePercent: number;
  passed: boolean;
  attempts: number;
}

export default interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  progressPercent: number;
  completedLessonIds: string[];
  /** Where "Resume" sends the learner back to. */
  lastLessonId?: string;
  lastAccessedAt?: string;
  completedAt?: string;
  certificateId?: string;
  /** Keyed by quiz id. */
  quizState?: Record<string, EnrollmentQuizState>;
}
