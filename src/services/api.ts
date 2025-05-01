import { FormData } from '../types';

export interface CorporationNumberResponse {
  valid: boolean;
  message?: string;
}

export const validateCorporationNumber = async (number: string): Promise<CorporationNumberResponse> => {
  // TODO: cache result to prevent additional reuests
  const response = await fetch(`https://fe-hometask-api.qa.vault.tryvault.com/corporation-number/${number}`);
  const data = await response.json();
  return data;
};

export const submitForm = async (data: FormData) => {
  return fetch('https://fe-hometask-api.qa.vault.tryvault.com/profile-details', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};