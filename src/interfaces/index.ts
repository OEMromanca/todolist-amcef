import { FILTER_MAP } from '../utils/filterMap';

export interface ITodo {
  id: string;
  title: string;
  category: string;
  duedate: string;
  completed: boolean;
  priority: string;
  description: string;
}

export type NewTodo = Omit<ITodo, 'id'>;
export type FilterKey = keyof typeof FILTER_MAP;
