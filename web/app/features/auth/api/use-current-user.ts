"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

// Define the User interface excluding 'email'
interface User {
  password: string;
  uid: string;
  name: string;
  image: string;
}

// Define the new interface that extends User and adds the email property
interface UserWithEmail extends User {
  email: string;
}

type Users = Record<string, User>;

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<UserWithEmail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = getCookie("authToken");
      if (typeof token !== "string") {
        setCurrentUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const users: Users = await import("../../../../data/users.json").then((module) => module.default);
        
        // Find the email associated with the UID (which is the token here)
        const email = Object.keys(users).find((key) => users[key].uid === token);

        if (email) {
          // Add the email to the user data by creating a UserWithEmail object
          setCurrentUser({ ...users[email], email });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return { currentUser, isLoading };
};
