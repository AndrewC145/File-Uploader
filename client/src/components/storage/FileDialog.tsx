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
import { useState, useContext } from "react";
import UserContext from "@/context/userContext";
import { useFolders } from "./FileLoader";

const PORT = import.meta.env.VITE_API_URL;

type FileDialogProps = {
  openButton: React.ReactNode;
  action: string;
};

function FileDialog({ openButton, action }: FileDialogProps) {
  const { user } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleFolderChange = (id: string) => {
    setSelectedFolder(Number(id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.id || !selectedFile) {
      console.error("User ID or file is not available");
      return;
    }

    try {
      await uploadFile(user.id, selectedFile, selectedFolder);
    } catch (error: any) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>{openButton}</DialogTrigger>
      <DialogContent>
        <form action={action} onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>Add a new file here.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Label htmlFor="fileName">File Name</Label>
            <Input onChange={handleFileChange} id="fileName" name="fileName" type="file" />
            <Label htmlFor="folderSelect">Select Folder</Label>
            <FolderSelect userId={user.id} onChange={handleFolderChange} />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

async function uploadFile(userId: string, file: File, folderId: number): Promise<void> {
  const formData = new FormData();
  formData.append("fileName", file);
  formData.append("userId", userId);
  formData.append("folderId", folderId.toString());

  try {
    const response = await axios.post(`${PORT}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    console.log(response);
  } catch (error: any) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
}

function FolderSelect({ onChange, userId }: { onChange: (value: string) => void; userId: string }) {
  const { folders } = useFolders(userId);

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Folder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Folders</SelectLabel>
          {folders.map((folder) => (
            <SelectItem value={folder.id.toString()} key={folder.id}>
              {folder.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileDialog;
