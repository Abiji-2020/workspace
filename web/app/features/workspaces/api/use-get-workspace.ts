'use client';

import { useEffect, useState } from "react";

interface Workspace {
  name: string;
  userId: string;
  joinCode: string;
}

interface WorkspaceWithId extends Workspace {
  _id: string;
}

type Workspaces = Record<string, Workspace>;

export const useGetWorkspace = (workspaceId: string) => {
  const [workspace, setWorkspace] = useState<WorkspaceWithId | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const workspaces: Workspaces = await import("../../../../data/workspaces.json").then(
          (module) => module.default
        );

        // Find the workspace by ID
        const workspaceData = workspaces[workspaceId];
        if (workspaceData) {
          setWorkspace({
            ...workspaceData,
            _id: workspaceId, // Add the ID to the workspace object
          });
        } else {
          setWorkspace(null); // Workspace not found
        }
      } catch (error) {
        console.error("Error fetching workspace data:", error);
        setWorkspace(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspace();
  }, [workspaceId]); // Re-run when workspaceId changes

  return { workspace, isLoading };
};
