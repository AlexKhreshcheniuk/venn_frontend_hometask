import '@testing-library/jest-dom';

import { render, screen, fireEvent,  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnboardingForm } from '../src/components/OnboardingForm';

interface MockOnboardingForm {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    corporationNumber: string;
  };
  errors: { [key: string]: string };
  submissionError: string;
  handleChange: jest.Mock<any, any>;
  handleBlur: jest.Mock<any, any>;
  handleSubmit: jest.Mock<any, any>;
}

const mockUseOnboardingForm: MockOnboardingForm = {
  formData: {
    firstName: '',
    lastName: '',
    phone: '',
    corporationNumber: '',
  },
  errors: {},
  submissionError: '',
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
  handleSubmit: jest.fn(),
};

jest.mock('../src/hooks/useOnboardingForm', () => ({
  useOnboardingForm: () => mockUseOnboardingForm,
}));

describe('OnboardingForm', () => {
  beforeEach(() => {
    mockUseOnboardingForm.handleChange.mockClear();
    mockUseOnboardingForm.handleBlur.mockClear();
    mockUseOnboardingForm.handleSubmit.mockClear();

    mockUseOnboardingForm.formData = {
      firstName: '',
      lastName: '',
      phone: '',
      corporationNumber: '',
    };
    mockUseOnboardingForm.errors = {};
    mockUseOnboardingForm.submissionError = '';
  });

  it('renders form fields', () => {
    render(<OnboardingForm />);
    expect(screen.getByTestId('firstName-input')).toBeInTheDocument();
    expect(screen.getByTestId('lastName-input')).toBeInTheDocument();
    expect(screen.getByTestId('phone-input')).toBeInTheDocument();
    expect(screen.getByTestId('corporationNumber-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('calls handleChange when input values change', async () => {
    render(<OnboardingForm />);
    const firstNameInput = screen.getByTestId('firstName-input');
    await userEvent.type(firstNameInput, 'John');
    expect(mockUseOnboardingForm.handleChange).toHaveBeenCalledTimes(4);
    expect(mockUseOnboardingForm.handleChange).toHaveBeenCalledWith(expect.objectContaining({
      target: expect.objectContaining({ name: 'firstName', value: 'John' }),
    }));
  });

  it('calls handleBlur when input fields lose focus', () => {
    render(<OnboardingForm />);
    const firstNameInput = screen.getByTestId('firstName-input');
    firstNameInput.focus();
    firstNameInput.blur();
    expect(mockUseOnboardingForm.handleBlur).toHaveBeenCalledTimes(1);
  });

  it('calls handleSubmit when the submit button is clicked', () => {
    render(<OnboardingForm />);
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);
    expect(mockUseOnboardingForm.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it('displays errors when provided by the hook', () => {
    mockUseOnboardingForm.errors = {
      firstName: 'First name is required',
      phone: 'Invalid phone number',
    };
    render(<OnboardingForm />);
    expect(screen.getByTestId('firstName-error')).toHaveTextContent('First name is required');
    expect(screen.getByTestId('phone-error')).toHaveTextContent('Invalid phone number');
  });

  it('displays submission error when provided by the hook', () => {
    mockUseOnboardingForm.submissionError = 'Failed to submit form.';
    render(<OnboardingForm />);
    expect(screen.getByTestId('submission-error')).toHaveTextContent('Failed to submit form.');
  });

  it('updates form data on change', async () => {
    render(<OnboardingForm />);
    const firstNameInput = screen.getByTestId('firstName-input');
    await userEvent.type(firstNameInput, 'John');
    expect(mockUseOnboardingForm.formData.firstName).toBe('John');
  });

  it('does not display error message if there is no error', () => {
    render(<OnboardingForm />);
    expect(screen.queryByTestId('firstName-error')).not.toBeInTheDocument();
  });
});
