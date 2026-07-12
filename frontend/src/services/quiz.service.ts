import { api } from './api/axios';
import { API_ENDPOINTS } from '@/constants/api';

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizSubmissionResult {
  scorePercentage: number;
  passed: boolean;
  correctAnswersCount: number;
  totalQuestionsCount: number;
  feedback: string;
}

export const quizService = {
  /**
   * Retrieves quiz outline and questions.
   */
  async getQuiz(id: string): Promise<Quiz> {
    try {
      return await api.get<Quiz>(API_ENDPOINTS.QUIZ.GET(id));
    } catch (error) {
      console.warn(`[Quiz Service] Fetching quiz ${id} failed, returning mock questions.`);
      return {
        id,
        title: 'SQL Indexing & Normalization Quiz',
        description: 'Test your understanding of primary keys, B-trees, Clustered index tables, and 3NF.',
        timeLimitMinutes: 15,
        questions: [
          {
            id: 'q-1',
            text: 'Which of the following database index designs speeds up range queries on columns?',
            options: ['B-Tree Index', 'Hash Index', 'Full-Text Index', 'Inverted Index'],
          },
          {
            id: 'q-2',
            text: 'A table is in Third Normal Form (3NF) if it is in 2NF and has no:',
            options: [
              'Transitive dependencies',
              'Partial dependencies',
              'Multi-valued dependencies',
              'Repeating groups',
            ],
          },
          {
            id: 'q-3',
            text: 'True or False: A table can have multiple clustered index definitions in SQL Server.',
            options: ['True', 'False'],
          },
        ],
      };
    }
  },

  /**
   * Submits student answers for evaluation.
   */
  async submitQuiz(id: string, answers: Record<string, string>): Promise<QuizSubmissionResult> {
    try {
      return await api.post<QuizSubmissionResult>(API_ENDPOINTS.QUIZ.SUBMIT, { quizId: id, answers });
    } catch (error) {
      console.warn(`[Quiz Service] Submitting quiz ${id} failed, running mock grading engine.`);
      
      // Basic mock evaluation logic
      let score = 0;
      let correct = 0;
      const total = 3;

      if (answers['q-1'] === 'B-Tree Index') correct++;
      if (answers['q-2'] === 'Transitive dependencies') correct++;
      if (answers['q-3'] === 'False') correct++;

      score = Math.round((correct / total) * 100);
      const passed = score >= 70;

      return {
        scorePercentage: score,
        passed,
        correctAnswersCount: correct,
        totalQuestionsCount: total,
        feedback: passed 
          ? 'Excellent! You demonstrate a solid grasp of database scaling principles.' 
          : 'Please review Lesson 2 regarding normalization forms and clustered indexes.',
      };
    }
  }
};
