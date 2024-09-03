import { FILTER_MAP } from './filterMap';

export const priorities = ['low', 'middle', 'high'];
export const categories = ['home', 'shopping', 'school', 'sport'];
export const mainFilters = ['all', 'active', 'completed'];

export const priorityFilters = Object.keys(FILTER_MAP).filter((filter) =>
  priorities.includes(filter)
);
export const categoryFilters = Object.keys(FILTER_MAP).filter((filter) =>
  categories.includes(filter)
);
