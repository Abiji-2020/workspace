"use client"
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
    params: { workspaceId: string }; // Add params here
  }
  
  const WorkspaceIdLayout = ({ children, params }: WorkspaceIdLayoutProps) => {
    return (
      <div className="h-full">
        <Toolbar params={params} />
        <div className="flex h-[calc(100vh-40px)]">
        <Sidebar/>
        {children}
        </div>
      </div>
    );
  };
  
  export default WorkspaceIdLayout;
  