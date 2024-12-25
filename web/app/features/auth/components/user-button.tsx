"use client";

import { useCurrentUser } from "app/features/auth/api/use-current-user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "../../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../../../../components/ui/dropdown-menu";
import { Loader, LogOut } from "lucide-react";
import { deleteCookie } from "cookies-next"; // Use deleteCookie instead of removeCookie

export const UserButton = () => {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (!currentUser) {
    return null;
  }

  // Accessing the current user's email dynamically
  const { name, image, email } = currentUser;
  const avatarFallback = name.charAt(0).toUpperCase();

  const signOut = () => {
    deleteCookie("authToken"); // Correct method to delete the authToken cookie
    window.location.reload(); // Optional: Reload the page to reflect the logged-out state
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage
            alt={name}
            src={image || "/default-avatar.png"} // Fallback to a default avatar
          />
          <AvatarFallback className="bg-sky-500 text-white">{avatarFallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={signOut} className="h-10">
          <LogOut className="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
