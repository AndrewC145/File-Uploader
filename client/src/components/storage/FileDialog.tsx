/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useState, useEffect } from "react";

const PORT = import.meta.env.VITE_API_URL;

function FileDialog({ openButton, action }: { openButton: React.ReactNode; action?: string }) {
  return (
    <Dialog>
      <form action={action} method="POST" encType="multipart/form-data">
        <DialogTrigger>{openButton}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>Add a new file here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label htmlFor="fileName">File Name</Label>
            <Input id="fileName" name="fileName" type="file" />
            <Label htmlFor="folderSelect">Select Folder</Label>
            <FolderSelect />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

async function uploadFile(file: File, folder: string) {
  const formData = new FormData();
}

async function fetchFolders() {
  try {
    const response = await axios.get(`${PORT}/folders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    console.log(response);
  } catch (error: any) {
    console.error("Error fetching folders:", error);
  }
}

function useFolders() {
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    fetchFolders().then((data) => setFolders(data));
  }, []);

  return folders;
}

function FolderSelect() {
  const folders = useFolders();

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a Folder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Folders</SelectLabel>
          <SelectItem value="Home">Home</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileDialog;
