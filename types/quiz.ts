/**
 * Type definitions for the quiz system
 */

export interface Student {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'tf' | 'short';
  question: string;
  choices?: string[];
  correctAnswer: string;
  explanation?: string;
  topic: string;
}

export interface QuizSession {
  id: string;
  studentId: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: QuizQuestion[];
  startTime: string;
  endTime?: string;
  status: 'in-progress' | 'completed' | 'abandoned';
}

export interface QuizAnswer {
  questionId: string;
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  topic: string;
  timeSpent?: number;
}

export interface QuizResult {
  id: string;
  quizSessionId: string;
  studentId: string;
  subject: string;
  topic: string;
  answers: QuizAnswer[];
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  grade: string;
  completedAt: string;
  timeSpent: number;
}

export interface PerformanceAnalysis {
  overallScore: number;
  grade: string;
  strengths: Array<{
    topic: string;
    description: string;
  }>;
  weaknesses: Array<{
    topic: string;
    description: string;
    missedQuestions: number;
  }>;
  detailedFeedback: string;
  improvementSuggestions: string[];
  nextSteps: string[];
}

export interface LearningResource {
  youtubeVideos: Array<{
    title: string;
    channel: string;
    searchQuery: string;
    description: string;
    estimatedDuration: string;
  }>;
  courses: Array<{
    title: string;
    platform: string;
    description: string;
    difficulty: string;
    url?: string;
  }>;
  studyMaterials: Array<{
    type: string;
    title: string;
    description: string;
    focus: string;
  }>;
  practiceResources: string[];
  studyPlan: string;
}

export interface StudentProgress {
  overallAverage: number;
  totalQuizzesTaken: number;
  subjectProgress: Array<{
    subject: string;
    averageScore: number;
    quizzesTaken: number;
    trend: 'improving' | 'stable' | 'declining';
    topicsStudied: string[];
  }>;
  insights: Array<{
    type: 'strength' | 'weakness' | 'improvement' | 'concern';
    message: string;
    actionable: boolean;
  }>;
  recommendations: string[];
  motivationalMessage: string;
  nextGoals: string[];
}

export interface QuizHistory {
  quizId: string;
  subject: string;
  topic: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  date: string;
  timeSpent?: number;
}
