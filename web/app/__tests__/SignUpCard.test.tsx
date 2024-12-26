import '@testing-library/jest-dom'; // Importing jest-dom
import { render, screen, fireEvent } from '@testing-library/react';
import { SignUpCard } from '../features/auth/components/sign-up-card';
import { describe, expect, test, vi } from 'vitest';
import React from 'react';

// Mock the useRouter hook from next/router
vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('SignUpCard', () => {
  test('enables continue button when all fields are filled', () => {
    render(<SignUpCard setState={() => {}} />);

    const nameInput = screen.getByTestId('name-input');
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const continueButton = screen.getByRole('button', { name: /continue/i });

    // Initial state: continue button should be disabled
    expect(continueButton).toBeDisabled();

    // Fill in the form fields
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });

    // After filling in all fields, continue button should be enabled
    expect(continueButton).toBeEnabled();
  });
});
