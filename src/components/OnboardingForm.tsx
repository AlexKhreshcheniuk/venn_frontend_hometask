import React from 'react';
import { useOnboardingForm } from '../hooks/useOnboardingForm';

export const OnboardingForm: React.FC = () => {
  const {
    formData,
    errors,
    submissionError,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useOnboardingForm();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Onboarding Form</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 p-2 w-full border rounded-md"
            data-testid="firstName-input"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1" data-testid="firstName-error">
              {errors.firstName}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1 p-2 w-full border rounded-md"
            data-testid="lastName-input"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1" data-testid="lastName-error">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="+13062776103"
          className="mt-1 p-2 w-full border rounded-md"
          data-testid="phone-input"
        />
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1" data-testid="phone-error">
            {errors.phone}
          </p>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Corporation Number</label>
        <input
          type="text"
          name="corporationNumber"
          value={formData.corporationNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          className="mt-1 p-2 w-full border rounded-md"
          data-testid="corporationNumber-input"
        />
        {errors.corporationNumber && (
          <p className="text-red-500 text-sm mt-1" data-testid="corporationNumber-error">
            {errors.corporationNumber}
          </p>
        )}
      </div>
      {submissionError && (
        <p className="text-red-500 text-sm mb-4 text-center" data-testid="submission-error">
          {submissionError}
        </p>
      )}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white p-3 rounded-md flex items-center justify-center"
        data-testid="submit-button"
      >
        Submit <span className="ml-2">→</span>
      </button>
    </div>
  );
};