import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { TriangleAlert } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import usersData from "../../../../data/users.json";
import React from "react";

type Users = Record<string, { name: string; password: string; uid: string }>;
const users = usersData as Users;

interface SignUpCardProps {
  setState: (state: "signIn" | "signUp") => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    if (!name) {
      setError("Name is required.");
      setSuccess("");
      setPending(false);
      return;
    }

    if (users[email]) {
      setError("Email already exists. Please use a different email.");
      setSuccess("");
      setPending(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      setSuccess("");
      setPending(false);
      return;
    }

    const uid = uuidv4();

    users[email] = { name, password, uid };
    console.log("Updated users.json:", users);

    setError("");
    setSuccess("Account created successfully! You can now sign in.");
    setPending(false);

    setTimeout(() => {
      window.location.href = "/auth/signin";
    }, 500);
  };

  return (
    <Card className="sign-in-card">
      <CardHeader className="px-0 pt-4">
        <CardTitle>Sign Up to continue</CardTitle>
        <CardDescription>Use your email or other service to continue</CardDescription>
      </CardHeader>
      {error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="bg-success/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-success mb-6">
          <p>{success}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form
          onSubmit={onSignUp}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            required
            data-testid="name-input"
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
            data-testid="password-input"
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            type="password"
            required
            data-testid="confirm-password-input"
          />
          <Button
            disabled={pending || !name || !email || !password || !confirmPassword}
            type="submit"
            className="w-full"
            size="lg"
          >
            {pending ? "Creating Account..." : "Continue"}
          </Button>
        </form>
        <Separator />
        <p className="text-xs text-muted-foreground">
          Already have an account?
          <span
            onClick={() => setState("signIn")}
            style={{
              color: "#0ea5e9",
              textDecoration: isHovered ? "underline" : "none",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
