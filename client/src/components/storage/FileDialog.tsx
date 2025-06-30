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

function FolderSelect() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a Folder" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Folders</SelectLabel>
          <SelectItem value="folder1">Folder 1</SelectItem>
          <SelectItem value="folder2">Folder 2</SelectItem>
          <SelectItem value="folder3">Folder 3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default FileDialog;
