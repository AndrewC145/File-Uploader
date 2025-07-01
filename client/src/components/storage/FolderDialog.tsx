import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FolderDialogProps = {
  openButton: React.ReactNode;
  action?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function FolderDialog({ openButton, action, onSubmit }: FolderDialogProps) {
  return (
    <Dialog>
      <form action={action} method="POST" onSubmit={onSubmit}>
        <DialogTrigger>{openButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogDescription>Add a new folder here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label htmlFor="folderName">Folder Name</Label>
            <Input
              id="folderName"
              name="folderName"
              type="text"
              placeholder="Enter folder name"
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default FolderDialog;
