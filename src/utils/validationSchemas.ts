import * as z from 'zod';

export const todoSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Todo is required' })
    .max(20, { message: 'Todo must be less than 20 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(100, { message: 'Description must be less than 100 characters' }),
});

export const todoUpdateSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(20, { message: 'Title must be less than 20 characters' }),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(100, { message: 'Description must be less than 100 characters' }),
});
