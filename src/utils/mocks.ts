import { FilterKey } from '../interfaces';
import { FILTER_NAMES } from './filterMap';

export const priorities: FilterKey[] = ['low', 'middle', 'high'];
export const categories: FilterKey[] = ['home', 'shopping', 'school', 'sport'];
export const mainFilters: FilterKey[] = ['all', 'active', 'completed'];

export const priorityFilters = FILTER_NAMES.filter((filter) =>
  priorities.includes(filter)
);

export const categoryFilters = FILTER_NAMES.filter((filter) =>
  categories.includes(filter)
);
