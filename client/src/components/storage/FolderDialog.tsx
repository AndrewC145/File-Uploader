/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import axios from "axios";

type FolderDialogProps = {
  openButton: React.ReactNode;
  action: string;
  getFolders: () => void;
};

function FolderDialog({ openButton, action, getFolders }: FolderDialogProps) {
  const [folderDialogOpen, setFolderDialogOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const createFolder: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);
    const data: object = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(action, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Folder created successfully:", response.data);
        setFolderDialogOpen(false);
        getFolders();
        setError("");
      }
    } catch (error: any) {
      console.error("Error creating folder:", error);
      setError(error.response?.data?.message || "Failed to create folder");
    }
  };
  return (
    <Dialog open={folderDialogOpen} onOpenChange={setFolderDialogOpen}>
      <DialogTrigger>{openButton}</DialogTrigger>
      <DialogContent>
        <form action={action} method="POST" onSubmit={createFolder}>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogDescription>Add a new folder here.</DialogDescription>
          </DialogHeader>
          <div className="mb-7 grid gap-4">
            <Label className="mt-3" htmlFor="folderName">
              Folder Name
            </Label>
            <Input
              id="folderName"
              name="folderName"
              type="text"
              placeholder="Enter folder name"
              required
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FolderDialog;
