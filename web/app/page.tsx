'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next"; // Use cookies-next for getting the cookie
import { UserButton } from "./features/auth/components/user-button";
import React from "react";
export default function Home() {
  const router = useRouter();



  useEffect(() => {
    const token = getCookie('authToken');
    console.log(token); // Get token using cookies-next
    if (!token) {
      router.push("/auth"); // Redirect to auth if no token
    }
  }, [router]);


  return (
    <div>
      <UserButton/>
    </div>
  );
}
