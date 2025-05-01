import React from 'react';
import { OnboardingForm } from './OnboardingForm';

const App: React.FC = () => (
  <div className="bg-gray-100 flex items-center justify-center min-h-screen">
    <div>
      <h1 className="text-lg font-semibold mb-4 text-center">Step 1 of 5</h1>
      <OnboardingForm />
    </div>
  </div>
);

export default App;