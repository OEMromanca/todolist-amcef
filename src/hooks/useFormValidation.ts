import {
  useForm,
  UseFormReturn,
  FieldValues,
  UseFormProps,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const useFormValidation = <TFormData extends FieldValues>(
  schema: z.ZodSchema<TFormData>,
  options?: UseFormProps<TFormData>
): UseFormReturn<TFormData> => {
  return useForm<TFormData>({
    resolver: zodResolver(schema),
    ...options,
  });
};
