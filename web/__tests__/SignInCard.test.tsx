import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { SignInCard } from '../app/features/auth/components/sign-in-card';

describe("SignInCard Component", () => {
  it("renders login title and inputs", () => {
    render(<SignInCard setState={vi.fn()} />);
    expect(screen.getByText(/Login to continue/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it("allows email and password input", () => {
    render(<SignInCard setState={vi.fn()} />);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls setState with 'signUp' when Sign up link is clicked", () => {
    const setStateMock = vi.fn();
    render(<SignInCard setState={setStateMock} />);
    const signUpLink = screen.getByText(/Sign up/i);

    fireEvent.click(signUpLink);
    expect(setStateMock).toHaveBeenCalledWith("signUp");
  });
});
