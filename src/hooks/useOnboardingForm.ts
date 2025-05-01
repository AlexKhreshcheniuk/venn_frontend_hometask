import { useState, ChangeEvent, FocusEvent } from 'react';
import { z } from 'zod';
import { validateCorporationNumber, submitForm } from '../services/api';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name cannot exceed 50 characters'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name cannot exceed 50 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+1\d{10}$/, 'Invalid phone number. Must be a Canadian number starting with +1 followed by 10 digits'),
  corporationNumber: z.string().min(1, 'Corporation number is required').length(9, 'Corporation number must be 9 characters long'),
});

type FormData = z.infer<typeof formSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export const useOnboardingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    corporationNumber: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionError, setSubmissionError] = useState('');
  const [_touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const extractZodErrors = (error: z.ZodError): FormErrors => {
    const newErrors: FormErrors = {};
    error.errors.forEach((err) => {
      newErrors[err.path[0] as keyof FormData] = err.message;
    });
    return newErrors;
  };

  const validateField = async (name: keyof FormData, value: string): Promise<string | undefined> => {
    try {
      const fieldSchema = formSchema.shape[name];
      fieldSchema.parse(value);

      if (name === 'corporationNumber' && value) {
        const response = await validateCorporationNumber(value);
        if (!response.valid) {
          return response.message || 'Invalid corporation number';
        }
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message;
      }
      return 'Error validating field';
    }
  };

  const validateForm = async (data: FormData): Promise<FormErrors> => {
    try {
      formSchema.parse(data);

      if (data.corporationNumber) {
        const response = await validateCorporationNumber(data.corporationNumber);
        if (!response.valid) {
          return { corporationNumber: response.message || 'Invalid corporation number' };
        }
      }
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        return extractZodErrors(error);
      }
      return {};
    }
  };

  const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setTouched((prev) => ({ ...prev, [fieldName]: true }));

    const fieldError = await validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: fieldError,
    }));
  };

  const handleSubmit = async () => {
    setSubmissionError('');

    const newErrors = await validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await submitForm(formData);
        if (response.status === 200) {
          alert('Form submitted successfully!');
          setFormData({ firstName: '', lastName: '', phone: '', corporationNumber: '' });
          setTouched({});
          setErrors({});
        } else {
          const data = await response.json();
          setSubmissionError(data.message || 'Submission failed');
        }
      } catch (error) {
        setSubmissionError('Error submitting form');
      }
    }
  };

  return { formData, errors, submissionError, handleChange, handleBlur, handleSubmit };
};
