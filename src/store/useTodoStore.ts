import { create } from 'zustand';

interface TodoStore {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
