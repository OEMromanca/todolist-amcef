import React from 'react';
import Input from '../shared/Input';
import { useTodoStore } from '../../store/useTodoStore';

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useTodoStore();

  return (
    <header className='h-[44px] flex items-center justify-center px-4 bg-gray-300 dark:bg-violet-700'>
      <Input
        type='search'
        placeholder='Search todos...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        name='search'
      />
    </header>
  );
};

export default Header;
