import {
  createTodoAPI,
  deleteTodoAPI,
  updateTodoAPI,
  toggleCompletedTodoAPI,
} from '../api/api';
import useInvalidateQuery from './useInvalidateQuery';
import { ITodo, NewTodo } from '../interfaces';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<
    ITodo,
    Error,
    ITodo,
    { previousTodos: ITodo[] | undefined }
  >({
    mutationFn: (updatedTodo: ITodo) => updateTodoAPI(updatedTodo),
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<ITodo[]>(['todos']);

      queryClient.setQueryData<ITodo[]>(
        ['todos'],
        (oldTodos) =>
          oldTodos?.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          ) || []
      );

      return { previousTodos };
    },

    onSuccess: () => {
      toast.success('Todo has been updated successfully!');
      invalidateTodos();
    },

    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('Error updating todo:', error);
      toast.error(`Error updating todo: ${error.message}`);
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<
    NewTodo,
    Error,
    NewTodo,
    { previousTodos: NewTodo[] | undefined }
  >({
    mutationFn: (newTodo: NewTodo) => createTodoAPI(newTodo),
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<NewTodo[]>(['todos']);

      queryClient.setQueryData<NewTodo[]>(['todos'], (old) => [
        ...(old || []),
        newTodo,
      ]);

      return { previousTodos };
    },

    onSuccess: () => {
      toast.success('Todo has been created successfully !');
      invalidateTodos();
    },
    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('Error creating todo:', error);
      toast.error(`Error creating todo: ${error.message}`);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<
    void,
    Error,
    ITodo,
    { previousTodos: ITodo[] | undefined }
  >({
    mutationFn: async (todo: ITodo) => {
      await deleteTodoAPI(todo);
    },

    onMutate: async (todoToDelete) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<ITodo[]>(['todos']);

      queryClient.setQueryData<ITodo[]>(
        ['todos'],
        (oldTodos) =>
          oldTodos?.filter((todo) => todo.id !== todoToDelete.id) || []
      );

      return { previousTodos };
    },

    onSuccess: () => {
      toast.success('Todo has been deleted successfully!');
      invalidateTodos();
    },

    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('Error deleting todo:', error);
      toast.error(`Error deleting todo: ${error.message}`);
    },
  });
};

export const useToggleCompletedTodo = () => {
  const queryClient = useQueryClient();
  const invalidateTodos = useInvalidateQuery(['todos']);

  return useMutation<
    ITodo,
    Error,
    ITodo,
    { previousTodos: ITodo[] | undefined }
  >({
    mutationFn: (todo: ITodo) => toggleCompletedTodoAPI(todo),

    onMutate: async (todoToToggle) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<ITodo[]>(['todos']);

      queryClient.setQueryData<ITodo[]>(
        ['todos'],
        (oldTodos) =>
          oldTodos?.map((todo) =>
            todo.id === todoToToggle.id
              ? { ...todo, completed: !todo.completed }
              : todo
          ) || []
      );

      return { previousTodos };
    },

    onSuccess: () => {
      invalidateTodos();
    },

    onError: (error, _, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
      console.error('Error toggling todo status:', error);
      toast.error(`Error toggling todo status: ${error.message}`);
    },
  });
};
