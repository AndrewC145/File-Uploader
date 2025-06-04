import FileHeader from "./FileHeader";
import Sidebar from "./Sidebar";

function Storage() {
  return <Sidebar />;
}

function StorageTest() {
  return (
    <>
      <div className="grid">
        <FileHeader />
        <div className="flex items-center justify-between px-3 py-2 md:px-5 xl:px-7">
          <p className="flex-[2]">File 1</p>
          <p className="flex-1">2023-10-01</p>
          <p className="flex-1">User A</p>
          <p className="flex-1">/path/to/file1</p>
        </div>
      </div>
    </>
  );
}
export default Storage;
