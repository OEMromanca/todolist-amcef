import React from 'react';
import SideBar from './SideBar';
import Header from './Header';
import TodoRoutes from '../../routes/todoRoutes';

const Layout: React.FC = () => {
  return (
    <div className='flex flex-col h-screen w-screen bg-gray-100 text-gray-900'>
      <Header />
      <div className='flex flex-1 overflow-hidden'>
        <SideBar />
        <div className='flex-1 overflow-y-auto bg-white'>
          <TodoRoutes />
        </div>
      </div>
    </div>
  );
};

export default Layout;
