import { render, screen, waitFor } from '@testing-library/react';
import { useCurrentUser } from "../features/auth/api/use-current-user";
import React from 'react';
import { vi } from 'vitest';

// Mock the API call directly
vi.mock('../features/auth/api/use-current-user', () => ({
  useCurrentUser: vi.fn(),
}));

const TestComponent = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (!currentUser) {
    return null; // Return null when no user
  }

  return <div data-testid="user">{currentUser.name}</div>;
};

describe('useCurrentUser', () => {
  it('should display user name when the API call succeeds', async () => {
    // Mock the successful API call response
    useCurrentUser.mockReturnValue({
      currentUser: { name: 'ragesh' },
      isLoading: false,
    });

    render(<TestComponent />);

    // Use waitFor to wait for the user element to appear
    const userElement = await waitFor(() => screen.getByTestId('user'));

    expect(userElement).toHaveTextContent('ragesh');
  });
});
