import { useQueryClient } from '@tanstack/react-query';

const useInvalidateQuery = (queryKey: string[]) => {
  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    try {
      queryClient.invalidateQueries({ queryKey });
    } catch (error) {
      console.error('Error invalidating query:', error);
    }
  };

  return invalidateQuery;
};

export default useInvalidateQuery;
