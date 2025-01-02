'use client';

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCurrentUser } from "app/features/auth/api/use-current-user";  // Importing the useCurrentUser hook

interface Workspace {
  name: string;
  userId: string;
  joinCode: string;
}
const generateCode=()=>{
  const code=Array.from({length:6},
    ()=>
      "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random()*36)]
  ).join('');

    return code;
}
interface Member {
  userId: string;
  workspaceId: string;
  role: "admin" | "member";
}

type Workspaces = Record<string, Workspace>;

export const useCreateWorkspace = () => {
  const [workspaces, setWorkspaces] = useState<Workspaces | null>(null);
  const [members, setMembers] = useState<Member[] | null>(null);  // State to track members
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useCurrentUser();  // Getting the current user details

  const addWorkspace = async (workspaceName: string) => {
    if (!currentUser) {
      setError("No user is currently logged in.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Log the current user details to debug
      console.log("Current User:", currentUser);

      // Simulate fetching the existing JSON data
      const existingWorkspaces: Workspaces = await import("../../../../data/workspaces.json").then(
        (module) => module.default
      );

      // Generate a new ID and join code for the workspace
      const newWorkspaceId = `workspace-${uuidv4()}`;
      const newJoinCode = generateCode();

      // Create the new workspace
      const newWorkspace: Workspace = {
        name: workspaceName,
        userId: currentUser.uid,  // Use the current user's ID (from the currentUser object)
        joinCode: newJoinCode,
      };

      // Create a new member for the current user (as admin)
      const newMember: Member = {
        userId: currentUser.uid,
        workspaceId: newWorkspaceId,
        role: "admin",  // Set the current user as admin
      };

      // Update the workspaces
      const updatedWorkspaces = {
        ...existingWorkspaces,
        [newWorkspaceId]: newWorkspace,
      };

      // Add the new member to the members list
      const updatedMembers = members ? [...members, newMember] : [newMember];

      // Here we simulate saving the data to the JSON file
      // In reality, you'd send the updated data to an API or backend for persistence
      setWorkspaces(updatedWorkspaces);
      setMembers(updatedMembers);

      return { _id: newWorkspaceId, ...newWorkspace, members: updatedMembers };
    } catch (e) {
      setError("Failed to add workspace");
      console.error("Error adding workspace:", e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { workspaces, addWorkspace, isLoading, error, members };
};
