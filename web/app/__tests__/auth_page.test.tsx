import '@testing-library/jest-dom'; // Add this at the top of your test files
import { render, screen } from '@testing-library/react';
import AuthPage from '../auth/page';
import { describe, it, expect,vi } from 'vitest';
import React from 'react';
// Mock the AuthScreen component
vi.mock('../features/auth/components/auth-screen', () => ({
  AuthScreen: () => <div>Mocked AuthScreen</div>,
}));

describe('AuthPage Component', () => {
  it('renders the AuthScreen component', () => {
    render(<AuthPage />);
    const authScreenElement = screen.getByText('Mocked AuthScreen');
    expect(authScreenElement).toBeInTheDocument();
  });
});
