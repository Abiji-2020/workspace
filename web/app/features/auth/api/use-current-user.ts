"use client";

import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import React from "react";

interface User {
  password: string;
  uid: string;
  name: string;
  image: string;
}

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

        const email = Object.keys(users).find((key) => users[key].uid === token);

        if (email) {
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
