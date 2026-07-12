import { api } from './api/axios';
import { API_ENDPOINTS } from '@/constants/api';

export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  isCompleted: boolean;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  progressPercentage: number;
  category: string;
  modules?: Module[];
}

export const programService = {
  /**
   * Retrieves all programs the student is enrolled in or available courses.
   */
  async getPrograms(): Promise<Program[]> {
    try {
      return await api.get<Program[]>(API_ENDPOINTS.PROGRAMS.LIST);
    } catch (error) {
      console.warn('[Program Service] Fetching programs failed, returning mock course list.');
      return [
        {
          id: 'prog-1',
          title: 'Advanced AI Architectures',
          description: 'Master Transformer neural network layers, attention mechanisms, and LLM tuning.',
          instructorName: 'Dr. Sarah Connor',
          progressPercentage: 45,
          category: 'Artificial Intelligence',
        },
        {
          id: 'prog-2',
          title: 'Full Stack Development Boot Camp',
          description: 'A comprehensive guide to frontend frameworks, backend integration, and cloud hosting.',
          instructorName: 'Alex Mercer',
          progressPercentage: 85,
          category: 'Software Engineering',
        },
        {
          id: 'prog-3',
          title: 'Database Systems & SQL Optimization',
          description: 'Learn SQL querying, query plans, connection pools, and database index clustering.',
          instructorName: 'Elena Rostova',
          progressPercentage: 20,
          category: 'Data Engineering',
        },
        {
          id: 'prog-4',
          title: 'UX Design Essentials',
          description: 'Create interactive, premium wireframes and follow accessibility guidelines.',
          instructorName: 'Mia Wong',
          progressPercentage: 0,
          category: 'UI/UX Design',
        },
      ];
    }
  },

  /**
   * Retrieves the modular lesson outline details of a specific course program.
   */
  async getProgramDetails(id: string): Promise<Program> {
    try {
      return await api.get<Program>(API_ENDPOINTS.PROGRAMS.DETAILS(id));
    } catch (error) {
      console.warn(`[Program Service] Fetching details for program ${id} failed, returning mock details.`);
      return {
        id,
        title: id === 'prog-1' ? 'Advanced AI Architectures' : 'Full Stack Development Boot Camp',
        description: 'Detailed program curriculum mapping and progress checklist.',
        instructorName: 'Lead Instructor',
        progressPercentage: id === 'prog-1' ? 45 : 85,
        category: 'Engineering',
        modules: [
          {
            id: 'mod-1',
            title: 'Module 1: Introduction and Core Concepts',
            lessons: [
              { id: 'les-1', title: 'Course overview & local environment setup', durationMinutes: 15, isCompleted: true },
              { id: 'les-2', title: 'Basic definitions and architecture principles', durationMinutes: 25, isCompleted: true },
            ],
          },
          {
            id: 'mod-2',
            title: 'Module 2: Advanced Practical Implementation',
            lessons: [
              { id: 'les-3', title: 'Hands-on project initialization', durationMinutes: 40, isCompleted: id === 'prog-2' },
              { id: 'les-4', title: 'Performance audit and debugging methods', durationMinutes: 30, isCompleted: false },
            ],
          },
        ],
      };
    }
  },

  /**
   * Searches programs matching the user query text.
   */
  async searchPrograms(query: string): Promise<Program[]> {
    try {
      return await api.post<Program[]>(API_ENDPOINTS.PROGRAMS.SEARCH, { query });
    } catch (error) {
      console.warn(`[Program Service] Searching programs for "${query}" failed, filtering local mocks.`);
      const all = await this.getPrograms();
      if (!query) return all;
      return all.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  }
};
