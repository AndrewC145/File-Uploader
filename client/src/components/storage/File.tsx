/* eslint-disable @typescript-eslint/no-explicit-any */
import DropDown from "./Dropdown";
import { EllipsisVertical } from "lucide-react";

function File({ files }: { files?: any[] }) {
  if (!files || files.length === 0) {
    return <p className="py-4 text-center text-gray-500">No files found.</p>;
  }
  return (
    <>
      {files.map((file) => {
        return (
          <div
            key={file.id}
            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 md:px-5 xl:px-7"
          >
            <p className="flex-[1.5]">{file.name}</p>
            <p className="flex-1">{file.metadata.mimetype}</p>
            <p className="flex-1">{file.metadata.size} bytes</p>
            <p className="flex-1">{new Date(file.metadata.lastModified).toLocaleDateString()}</p>
            <DropDown icon={<EllipsisVertical />} />
          </div>
        );
      })}
    </>
  );
}

export default File;
