import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import "../Styles/AuthScreen.css"; // Import the CSS file
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { SignInFlow } from "../types";

interface SignInCardProps{
    setState:(state:SignInFlow)=>void;
};


export const SignInCard = ({setState}:SignInCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

  return (
    <Card className="sign-in-card">
        <CardHeader className="px-0 pt-4"> {/* Adjust padding if needed */}
            <CardTitle>Login to continue</CardTitle>
            <CardDescription>
                Use your email or other service to continue
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 px-0 pb-0">
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}> 
                <Input
                    disabled={false}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <Input
                    disabled={false}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                />
                <Button type="submit" className="w-full" style={{marginBottom:'12px'}} size="lg" disabled={false}>
                    Continue
                </Button>
            </form>
            <Separator />
            <div className="button-container"style={{marginTop:'12px'}}>
                <Button
                    disabled={false}
                    onClick={() => {}}
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                >
                    <FcGoogle style={{ fontSize: '1.25rem' }} />
                    Continue with Google
                </Button>
                <Button
                    disabled={false}
                    onClick={() => {}}
                    variant="outline"
                    size="lg"
                    className="w-full relative"
                >
                    <FaGithub style={{ fontSize: '1.25rem' }} />
                    Continue with Github
                </Button>
            </div>
           <p className="text-xs text-muted-foreground">
            Don&apos;t have an account?
    <span
    onClick={()=>setState("signUp")}
      style={{
        color: '#0ea5e9', // Sky-700 color in hex
        textDecoration: isHovered ? 'underline' : 'none',
        cursor: 'pointer'
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
