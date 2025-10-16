
export interface Lesson {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  completed: boolean;
  content: LessonContent[];
}

export interface LessonContent {
  type: 'text' | 'image' | 'question';
  content: string;
  image?: string;
  options?: string[];
  correctAnswer?: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  route: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  coins: number;
  badges: string[];
  completedLessons: string[];
  completedGames: string[];
  completedQuizzes: string[];
  stickers: string[];
}
