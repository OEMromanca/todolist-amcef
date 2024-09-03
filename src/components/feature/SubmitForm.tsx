import React, { useState } from 'react';
import Button from '../shared/Button';
import Dropdown from '../shared/Dropdown';
import CustomDatePicker from '../shared/DatePicker';
import Input from '../shared/Input';
import { useCreateTodo } from '../../hooks/mutations';
import { priorities, categories } from '../../utils/mocks';
import { ITodo } from '../../interfaces';
import { todoSchema } from '../../utils/validationSchemas';
import { useFormValidation } from '../../hooks/useFormValidation';
import moment, { Moment } from 'moment';
import { FaPlus } from 'react-icons/fa';

const SubmitForm: React.FC = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [selectedPriority, setSelectedPriority] = useState('low');
  const [dueDate, setDueDate] = useState<Moment | null>(moment());

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
  } = useFormValidation(todoSchema);

  const { mutate, isPending } = useCreateTodo();

  const onSubmit = (data: { title: string; description: string }) => {
    const formattedDueDate = dueDate ? dueDate.toISOString() : '';

    const newTodo: Omit<ITodo, 'id'> = {
      title: data.title,
      description: data.description,
      category: selectedCategory,
      duedate: formattedDueDate,
      completed: false,
      priority: selectedPriority,
    };

    mutate(newTodo);
    reset();
  };

  return (
    <div className='mt-4'>
      {!isFormVisible && (
        <Button
          variant='add'
          type='button'
          onClick={() => setIsFormVisible((prev) => !prev)}
          icon={<FaPlus />}
        >
          Add task
        </Button>
      )}
      {isFormVisible && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col w-full'
        >
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              name='title'
              placeholder='Enter task title'
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
          <div className='flex gap-2 mt-2'>
            <Dropdown
              options={priorities}
              onSelect={(priority: string) => setSelectedPriority(priority)}
              selectedOption={selectedPriority}
            />
            <Dropdown
              options={categories}
              onSelect={(category: string) => setSelectedCategory(category)}
              selectedOption={selectedCategory}
            />
            <CustomDatePicker
              name='dueDate'
              value={dueDate ? dueDate.format('YYYY-MM-DD') : ''}
              onChange={(date: Moment) => setDueDate(date)}
              closeOnSelect={true}
            />
          </div>
          <div className='flex gap-2 mt-2'>
            <Button
              variant='addOpen'
              type='submit'
              disabled={!!errors.title || isPending}
              className={errors.title ? 'opacity-50 cursor-not-allowed' : ''}
            >
              Add task
            </Button>
            <Button
              type='button'
              onClick={() => {
                setIsFormVisible((prev) => !prev);
                reset();
              }}
              className='bg-gray-500'
              variant='cancel'
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SubmitForm;
