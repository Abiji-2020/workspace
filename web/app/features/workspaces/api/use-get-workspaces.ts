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

export const useGetWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState<WorkspaceWithId[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const workspaces: Workspaces = await import("../../../../data/workspaces.json").then(
          (module) => module.default
        );

        // Add _id to each workspace by extracting the key from the workspaces object
        const workspacesWithId = Object.entries(workspaces).map(([key, workspace]) => ({
          ...workspace,
          _id: key // Add _id as the key
        }));

        setWorkspaces(workspacesWithId);
      } catch (error) {
        console.error("Error fetching workspace data:", error);
        setWorkspaces(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  return { workspaces, isLoading };
};
