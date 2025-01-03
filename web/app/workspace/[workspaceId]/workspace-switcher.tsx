import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "../../../components/ui/dropdown-menu";
import { Button } from "../../../components/ui/button";
import { useParams } from "next/navigation"; // For Next.js dynamic routing
import { useGetWorkspace } from "../../features/workspaces/api/use-get-workspace";
import { useGetWorkspaces } from "../../features/workspaces/api/use-get-workspaces";
import { useCreateWorkspaceModel } from "../../features/workspaces/store/use-create-workspace-model";
import { Loader, Plus } from "lucide-react";

export const WorkspaceSwitcher = () => {
  const params = useParams();
  const workspaceId = params?.workspaceId as string; // Extract workspaceId
  const [_open, setOpen] = useCreateWorkspaceModel();

  const { workspace, isLoading: workspaceLoading } = useGetWorkspace(workspaceId);
  const { workspaces, isLoading: workspacesLoading } = useGetWorkspaces();

  const filteredWorkspaces = workspaces?.filter(
    (workspace) => workspace?._id !== workspaceId
  );

  const handleNavigate = (id: string) => {
    window.location.href = `/workspace/${id}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl">
          {workspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name?.charAt(0).toLocaleUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        {/* Active Workspace */}
        <DropdownMenuItem
          onClick={() => handleNavigate(workspaceId)}
          className="cursor-pointer flex-col justify-start items-start capitalize"
        >
          {workspace?.name}
          <span className="text-xs text-muted-foreground">Active workspace</span>
        </DropdownMenuItem>

        <DropdownMenuGroup>
          {filteredWorkspaces?.map((ws) => (
            <DropdownMenuItem
              key={ws._id}
              onClick={() => handleNavigate(ws._id)}
              className="truncate overflow-hidden cursor-pointer capitalize"
            >
          <div className="shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
                {ws?.name.charAt(0).toUpperCase()}
                </div>
              <p className="truncate">{ws.name}</p>
            </DropdownMenuItem>
          ))}

          <DropdownMenuItem onClick={() => setOpen(true)} className="cursor-pointer">
          <div className="size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
          <Plus/>
            </div>
            Create a new Workspace
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
