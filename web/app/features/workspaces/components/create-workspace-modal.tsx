import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "../../../../components/ui/dialog";
  import { Input } from "components/ui/input";
  import { Button } from "components/ui/button";
  import { useCreateWorkspaceModel } from "../store/use-create-workspace-model";
  import { useCreateWorkspace } from "../api/use-create-workspace";
  import { useState } from "react";
  import { useRouter } from "next/navigation"; // Import useRouter
  import { toast } from "sonner";

  export const CreateWorkspaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModel();
    const { addWorkspace, isLoading } = useCreateWorkspace();
    const [workspaceName, setWorkspaceName] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter(); // Initialize useRouter
  
    const handleClose = () => {
      setOpen(false);
      setWorkspaceName("");
      setError(null);
    };
  
    const handleCreateWorkspace = async () => {
      if (workspaceName.trim().length < 3) {
        setError("Workspace name must be at least 3 characters long.");
        return;
      }
  
      try {
        const userId = "current-user-id"; // Replace with actual user ID from context or state
        const result = await addWorkspace(workspaceName, userId);
        if (result) {
          toast.success("Workspace created");
          handleClose();
          router.push(`/workspace/${result._id}`);
        }
      } catch (e) {
        setError("Failed to create workspace. Please try again.");
        console.error(e);
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Workspace</DialogTitle>
          </DialogHeader>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleCreateWorkspace();
            }}
          >
            <Input
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              disabled={isLoading}
              required
              autoFocus
              minLength={3}
              placeholder="Workspace name e.g. 'Work', 'Personal', 'Home'"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end">
              <Button
                disabled={isLoading || workspaceName.trim().length < 3}
                onClick={handleCreateWorkspace}
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  