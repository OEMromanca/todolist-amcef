import { format, isValid, parseISO } from 'date-fns';
import { FilterKey } from '../interfaces';
import { useParams } from 'react-router-dom';
import { FILTER_MAP } from './filterMap';

export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2);

  if (!timestamp || !randomStr) {
    console.error(
      'Error generating unique ID: Invalid timestamp or random string'
    );
    return 'default-id';
  }

  return `${timestamp}-${randomStr}`;
};

export const formatDate = (date: Date | string | undefined): string => {
  if (!date) {
    console.warn('formatDate is not expecting a null value');
    return '';
  }

  if (typeof date === 'string') {
    const parsedDate = parseISO(date);
    if (isValid(parsedDate)) {
      return format(parsedDate, 'd MMMM yyyy');
    }
  } else if (date instanceof Date) {
    if (isValid(date)) {
      return format(date, 'd MMMM yyyy');
    }
  }

  console.warn('Invalid date value:', date);
  return '';
};

export const transformText = (
  text: string,
  type: 'uppercase' | 'lowercase' | 'capitalizeFirst'
): string => {
  switch (type) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalizeFirst':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
};

export const useFilterFromParams = (): FilterKey => {
  const { filter } = useParams<{ filter?: string }>();
  if (filter && filter in FILTER_MAP) {
    return filter as FilterKey;
  } else {
    console.error(`Invalid filter parameter: ${filter}`);
    return 'all';
  }
};
