import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { SignInFlow } from "../types";
import usersData from "../../../../data/users.json"; // Import the JSON file
import { TriangleAlert } from "lucide-react";
import { setCookie } from "cookies-next"; // Add cookies-next for setting cookies
import React from "react";
type Users = Record<string, { password: string, uid: string }>; // Users data now includes uid
const users = usersData as Users;

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const user = users[email];
    if (user && user.password === password) {
      const token = user.uid; // Use uid from JSON for the token
      setCookie("authToken", token); // Save uid as token in cookies

      alert("Sign-in successful!");
      setError("");
      window.location.href = "/"; // Redirect to the root after successful login
    } else {
      setError("Invalid email or password");
    }

    setPending(false);
  };

  return (
    <Card className="sign-in-card">
      <CardHeader className="px-0 pt-4">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Use your email or other service to continue</CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form
          onSubmit={onPasswordSignIn}
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
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
          />
          <Button
            disabled={pending}
            type="submit"
            className="w-full"
            size="lg"
          >
            Continue
          </Button>
        </form>
        <Separator />
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => setState("signUp")}
            style={{
              color: "#0ea5e9",
              textDecoration: isHovered ? "underline" : "none",
              cursor: "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
