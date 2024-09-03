import React from 'react';
import { useFilteredTodos } from '../../hooks/queries';
import { useFilterFromParams, transformText } from '../../utils/utils';
import Message from '../shared/Message';
import TodoItem from './TodoItem';
import SubmitForm from './SubmitForm';
import { useTodoStore } from '../../store/useTodoStore';

const TodoList: React.FC = () => {
  const { searchQuery } = useTodoStore();
  const filter = useFilterFromParams();

  const { data, isLoading, isError } = useFilteredTodos(filter);

  const filteredTodos = React.useMemo(() => {
    return data?.filter((todo) => {
      const lowerCaseTitle = todo.title.toLowerCase();
      const lowerCaseQuery = searchQuery.toLowerCase();
      return lowerCaseTitle.includes(lowerCaseQuery);
    });
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Message type='loading' text='Loading...' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Message type='error' text='Error fetching todos' />
      </div>
    );
  }

  return (
    <div className='p-5'>
      <div className='text-2xl font-bold rounded-md text-black mb-4'>
        {transformText(filter, 'capitalizeFirst')}
      </div>
      {filteredTodos && filteredTodos.length === 0 ? (
        <Message type='noTodos' text='No todos available in this section.' />
      ) : (
        filteredTodos &&
        filteredTodos.map((todo) => <TodoItem key={todo.id} item={todo} />)
      )}
      <SubmitForm />
    </div>
  );
};

export default TodoList;
