'use client';

import { useGetWorkspace } from "app/features/workspaces/api/use-get-workspace";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  const { workspace, isLoading } = useGetWorkspace(params.workspaceId);

  if (isLoading) {
    return <div>Loading workspace details...</div>;
  }

  if (!workspace) {
    return <div>Workspace not found.</div>;
  }

  return (
    <div>
      <h1>Workspace Details</h1>
      <p>ID: {workspace._id}</p>
      <p>Name: {workspace.name}</p>
      <p>User ID: {workspace.userId}</p>
      <p>Join Code: {workspace.joinCode}</p>
    </div>
  );
};

export default WorkspaceIdPage;
