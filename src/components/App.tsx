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
// import { useState } from 'react'

// import '../App.css'

// function App() {
  
  
//   return (
//     <div className="modal-container">
//       <div className="onboarding-form">
//         <h2 className="onboarding-form__title">Onboarding Form</h2>
//         <div className="onboarding-form__group">
//           <label htmlFor="firstName" className="onboarding-form__label">
//             First Name
//           </label>
//           <input type="text" id="firstName" className="onboarding-form__input" />
//         </div>
//         <div className="onboarding-form__group">
//           <label htmlFor="lastName" className="onboarding-form__label">
//             Last Name
//           </label>
//           <input type="text" id="lastName" className="onboarding-form__input" />
//         </div>
//         <div className="onboarding-form__group onboarding-form__group--full-width">
//           <label htmlFor="phoneNumber" className="onboarding-form__label">
//             Phone Number
//           </label>
//           <input type="tel" id="phoneNumber" className="onboarding-form__input" />
//         </div>
//         <div className="onboarding-form__group onboarding-form__group--full-width">
//           <label htmlFor="corporationNumber" className="onboarding-form__label">
//             Corporation Number
//           </label>
//           <input
//             type="text"
//             id="corporationNumber"
//             className="onboarding-form__input"
//           />
//           <p className="onboarding-form__error-message">
//             Invalid Corporation Number
//           </p>
//         </div>
//         <button type="submit" className="onboarding-form__submit-button">
//           Submit
//           <svg
//             viewBox="0 0 24 24"
//             className="onboarding-form__submit-button-icon"
//           >
//             <path d="M5 12H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//             <path d="M12 5L19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
//           </svg>

//         </button>
//       </div>
//     </div>
//   )
// }

// export default App
