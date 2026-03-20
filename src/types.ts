export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  category: Category;
}

export type Category = 'personal' | 'work' | 'shopping' | 'health';

export type FilterType = 'all' | 'active' | 'completed';
