'use client';

import { useEffect, useState } from "react";
import { useCurrentUser } from "app/features/auth/api/use-current-user"; // Assuming you have a hook for the current user

interface Workspace {
  name: string;
  userId: string;
  joinCode: string;
}

interface WorkspaceWithId extends Workspace {
  _id: string;
}

interface Member {
  userId: string;
  workspaceId: string;
  role: "admin" | "member";
}

type Workspaces = Record<string, Workspace>;

export const useGetWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceWithId[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { currentUser } = useCurrentUser(); // Getting current user

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (!currentUser) {
        setError("No user logged in.");
        setIsLoading(false);
        return;
      }

      try {
        // Fetching workspaces
        const workspaces: Workspaces = await import("../../../../data/workspaces.json").then(
          (module) => module.default
        );

        // Fetching members data (assuming it's available in a similar format)
        const members: { userId: string; workspaceId: string; role: string }[] = await import("../../../../data/members.json").then(
          (module) => module.default
        );

        // Cast the `role` property to the expected "admin" | "member" type
        const typedMembers: Member[] = members.map((member) => ({
          ...member,
          role: member.role as "admin" | "member", // Type-casting the role
        }));

        // Filter members to find workspaces where current user is a member or admin
        const userWorkspaces = typedMembers
          .filter(
            (member) =>
              member.userId === currentUser.uid &&
              (member.role === "admin" || member.role === "member")
          )
          .map((member) => member.workspaceId);

        // Add _id to each workspace by extracting the key from the workspaces object
        const workspacesWithId = Object.entries(workspaces)
          .filter(([key]) => userWorkspaces.includes(key)) // Only include workspaces the user is a member/admin of
          .map(([key, workspace]) => ({
            ...workspace,
            _id: key, // Add _id as the key
          }));

        setWorkspaces(workspacesWithId);
      } catch (error) {
        console.error("Error fetching workspace data:", error);
        setError("Failed to fetch workspaces.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaces();
  }, [currentUser]);

  return { workspaces, isLoading, error };
};
