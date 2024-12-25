'use client';

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useCurrentUser } from "app/features/auth/api/use-current-user";  // Importing the useCurrentUser hook

interface Workspace {
  name: string;
  userId: string;
  joinCode: string;
}

type Workspaces = Record<string, Workspace>;

export const useCreateWorkspace = () => {
  const [workspaces, setWorkspaces] = useState<Workspaces | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useCurrentUser();  // Getting the current user details

  const addWorkspace = async (workspaceName: string, userId: string) => {
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
      const newJoinCode = uuidv4().slice(0, 8);

      // Create the new workspace
      const newWorkspace: Workspace = {
        name: workspaceName,
        userId: currentUser.uid,  // Use the current user's ID (from the currentUser object)
        joinCode: newJoinCode,
      };

      // Update the workspaces
      const updatedWorkspaces = {
        ...existingWorkspaces,
        [newWorkspaceId]: newWorkspace,
      };

      // Here we simulate saving the data to the JSON file
      // In reality, you'd send the updated data to an API or backend for persistence
      setWorkspaces(updatedWorkspaces);

      return { _id: newWorkspaceId, ...newWorkspace };
    } catch (e) {
      setError("Failed to add workspace");
      console.error("Error adding workspace:", e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { workspaces, addWorkspace, isLoading, error };
};
