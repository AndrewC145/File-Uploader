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
import { useState, useEffect, useContext } from "react";
import UserContext from "@/context/userContext";

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

/*

async function uploadFile(file: File, folder: string) {
  const formData = new FormData();
}
*/

async function fetchFolders(userId: string): Promise<any> {
  try {
    const response = await axios.get(`${PORT}/${userId}/folders`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data.folders || [];
  } catch (error: any) {
    console.error("Error fetching folders:", error);
    return [];
  }
}

function useFolders() {
  const { user } = useContext(UserContext);
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    fetchFolders(user?.id).then((data) => setFolders(data || []));
  }, [user?.id]);

  return folders;
}

function FolderSelect() {
  const folders = useFolders();

  if (folders.length === 0) {
    return <p>No folders available</p>;
  }

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a Folder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Folders</SelectLabel>
          {folders.map((folder) => (
            <SelectItem value={folder} key={folder}>
              {folder}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileDialog;
