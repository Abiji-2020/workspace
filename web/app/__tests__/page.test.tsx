import '@testing-library/jest-dom'; // Add this at the top of your test files
import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import Home from '../page';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('cookies-next', () => ({
  getCookie: vi.fn(),
}));

// ... previous code remains the same
describe('Home', () => {
  const mockRouterPush = vi.fn();
  const mockRouterReplace = vi.fn();

  beforeEach(() => {
    // Mock `useRouter` to return custom functions
    (useRouter as vi.Mock<typeof import('next/navigation')>).mockReturnValue({

      push: mockRouterPush,
      replace: mockRouterReplace,
    });

    // Explicitly type `getCookie` as a mock function for Vitest
    (getCookie as vi.Mock<typeof import('cookies-next')>).mockClear();
  });

  it('redirects to /auth if no token is found', () => {
    // Mock the return value of `getCookie`
    (getCookie as vi.Mock<typeof import('cookies-next')>).mockReturnValueOnce(null); // No token

    render(<Home />);

    expect(mockRouterPush).toHaveBeenCalledWith('/auth');
  });
});

