import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import CustomDatePicker from '../shared/DatePicker';
import Input from '../shared/Input';
import { categories, priorities } from '../../utils/mocks';
import {
  useDeleteTodo,
  useToggleCompletedTodo,
  useUpdateTodo,
} from '../../hooks/mutations';
import { formatDate } from '../../utils/utils';
import CustomSwitch from '../shared/Switch';
import { ITodo } from '../../interfaces';
import { useFormValidation } from '../../hooks/useFormValidation';
import { todoUpdateSchema } from '../../utils/validationSchemas';

interface TodoItemProps {
  item: ITodo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(item.category);
  const [selectedPriority, setSelectedPriority] = useState(item.priority);
  const [isCompleted, setIsCompleted] = useState(item.completed);
  const [dueDate, setDueDate] = useState<Moment | null>(
    item.duedate ? moment(item.duedate) : null
  );

  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: toggleCompleteTodo } = useToggleCompletedTodo();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useFormValidation(todoUpdateSchema, {
    defaultValues: {
      title: item.title,
      description: item.description,
    },
  });

  const onSubmit = (data: { title: string; description: string }) => {
    const updatedTodo: ITodo = {
      ...item,
      title: data.title,
      description: data.description,
      category: selectedCategory,
      priority: selectedPriority,
      completed: isCompleted,
      duedate: dueDate ? dueDate.format('YYYY-MM-DD') : '',
    };
    updateTodo(updatedTodo);
    setIsEditing((prev) => !prev);
    reset();
  };

  return (
    <div className='text-sm border-b border-gray-200 flex flex-col relative cursor-pointer py-2 mt-4 w-full'>
      {!isEditing ? (
        <div className='flex items-start justify-between w-full'>
          <div className='flex flex-col flex-1'>
            <div className='flex items-start mb-2 w-full'>
              <CustomSwitch
                checked={isCompleted}
                onChange={() => {
                  setIsCompleted((prev) => !prev);
                  toggleCompleteTodo(item);
                }}
              />
              <div className='flex flex-col flex-1 ml-2'>
                <h3 className='text-gray-900'>{item.title}</h3>
                {item.description && (
                  <p className='text-gray-700 mt-1'>{item.description}</p>
                )}
              </div>
            </div>
          </div>
          <div className='flex flex-col ml-4'>
            <div className='flex gap-4 mb-2'>
              <div className='flex flex-col'>
                <p className='font-semibold text-gray-700'>Category:</p>
                <p className='text-gray-900'>{item.category}</p>
              </div>
              <div className='flex flex-col'>
                <p className='font-semibold text-gray-700'>Priority:</p>
                <p className='text-gray-900'>{item.priority}</p>
              </div>
              <div className='flex flex-col'>
                <p className='font-semibold text-gray-700'>Date:</p>
                <p className='text-gray-900'>{formatDate(item.duedate)}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col w-full'
        >
          <div className='flex mb-2 w-full items-start'>
            <CustomSwitch
              checked={isCompleted}
              onChange={() => {
                setIsCompleted((prev) => !prev);
              }}
            />
            <div className='flex flex-col flex-1 ml-2'>
              <Input
                type='text'
                name='title'
                placeholder='Enter title'
                register={register}
                error={errors.title?.message}
                onChange={() => clearErrors('title')}
              />
              <Input
                type='text'
                name='description'
                placeholder='Enter description'
                register={register}
                error={errors.description?.message}
                onChange={() => clearErrors('description')}
              />
            </div>
          </div>
          <div className='flex gap-2 mt-2'>
            <Dropdown
              options={categories}
              onSelect={setSelectedCategory}
              selectedOption={selectedCategory}
            />
            <Dropdown
              options={priorities}
              onSelect={setSelectedPriority}
              selectedOption={selectedPriority}
            />
            <CustomDatePicker
              name='duedate'
              value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
              onChange={setDueDate}
              closeOnSelect={true}
            />
          </div>
          <div className='flex gap-2 mt-2'>
            <Button
              type='submit'
              disabled={isUpdating || !!errors.title}
              className={`flex-none ${
                errors.title ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              variant='save'
            >
              Save
            </Button>
            <Button
              type='button'
              onClick={() => {
                setIsEditing((prev) => !prev);
                reset();
              }}
              variant='cancel'
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
      {!isEditing && (
        <div className='flex gap-2 mt-2'>
          <Button
            variant='save'
            type='button'
            onClick={() => setIsEditing((prev) => !prev)}
          >
            Edit
          </Button>
          <Button
            type='button'
            onClick={() => deleteTodo(item)}
            disabled={isDeleting}
            variant='remove'
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
