import { FILTER_MAP } from '../utils/filterMap';
import { useQuery } from '@tanstack/react-query';
import { FilterKey } from '../interfaces';

export const useFilteredTodos = (filter: FilterKey) => {
  const fetchData = async () => {
    const fetchFunction = FILTER_MAP[filter];
    if (!fetchFunction) {
      throw new Error(`Filter "${filter}" not found in FILTER_MAP`);
    }
    return await fetchFunction();
  };

  return useQuery({
    queryKey: ['todos', filter],
    queryFn: fetchData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!filter,
  });
};
