import { useGetWorkspace } from "app/features/workspaces/api/use-get-workspace";
import { Button } from "components/ui/button";
import { Info, Search } from "lucide-react";
import { use } from "react"; // Import use to unwrap params

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

export const Toolbar = ({ params }: WorkspaceIdPageProps) => {
  const { workspaceId } = use(params);  // Unwrap params using React.use()
  
  const { workspace, isLoading } = useGetWorkspace(workspaceId); // Use the unwrapped workspaceId

  return (
    <div className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-[280px] max-w-[642px] grow shrink">
        <Button size="sm" className="bg-accent/25 hover:bg-accent/25 w-full justify-start h-7 px-2">
          <Search className="w-4 h-4 text-white mr-2" />
          <span className="text-white text-xs">
            {isLoading ? "Loading..." : `Search ${workspace?.name}`}
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button className="bg-transparent hover:bg-accent/10 text-accent" size="iconsm">
          <Info className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};
