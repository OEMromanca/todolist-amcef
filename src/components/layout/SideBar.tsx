import React from 'react';
import { FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import NavLink from '../../routes/NavLink';
import {
  priorityFilters,
  categoryFilters,
  mainFilters,
} from '../../utils/mocks';
import { useFilteredTodos } from '../../hooks/queries';
import { useCountTodos, useFilterFromParams } from '../../utils/utils';
import { FilterKey } from '../../interfaces';

const SideBar: React.FC = () => {
  const [showPriorities, setShowPriorities] = React.useState(false);
  const [showCategories, setShowCategories] = React.useState(false);

  const filter = useFilterFromParams();
  const { data: todos } = useFilteredTodos(filter);

  const togglePriorities = React.useCallback(
    () => setShowPriorities((prev) => !prev),
    []
  );

  const toggleCategories = React.useCallback(
    () => setShowCategories((prev) => !prev),
    []
  );

  const renderFilterLinks = React.useCallback(
    (filters: FilterKey[]) => {
      return filters.map((filter) => (
        <div key={filter} className='flex items-center justify-between'>
          <NavLink to={`/${filter}`}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
            <span className='text-gray-600'>{useCountTodos(filter)}</span>
          </NavLink>
        </div>
      ));
    },
    [todos]
  );

  return (
    <div className='flex flex-col justify-between h-full w-64 bg-gray-200'>
      <div className='w-full p-4'>
        <h2 className='text-lg font-bold mb-4 text-gray-700'>Filters</h2>
        <div>
          {renderFilterLinks(mainFilters)}

          <div className='mt-2'>
            <button
              onClick={togglePriorities}
              className='text-black font-bold w-full text-left ml-2 flex items-center'
            >
              <span className='flex-1'>Priorities</span>
              <div className='mr-3'>
                {showPriorities ? (
                  <FaChevronDown className='text-gray-600' />
                ) : (
                  <FaChevronLeft className='text-gray-600' />
                )}
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${
                showPriorities ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              {renderFilterLinks(priorityFilters)}
            </div>
          </div>

          <div className='mt-2'>
            <button
              onClick={toggleCategories}
              className='text-black font-bold w-full text-left ml-2 flex items-center'
            >
              <span className='flex-1'>Categories</span>
              <div className='mr-3'>
                {showCategories ? (
                  <FaChevronDown className='text-gray-600' />
                ) : (
                  <FaChevronLeft className='text-gray-600' />
                )}
              </div>
            </button>
            <div
              className={`transition-all duration-300 ease-out overflow-hidden ${
                showCategories ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              {renderFilterLinks(categoryFilters)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
