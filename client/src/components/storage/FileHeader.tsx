function FileHeader() {
  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 md:px-5 xl:px-7">
        <p className="flex-[1.6] font-bold">File Name</p>
        <p className="flex-1 font-bold">Type</p>
        <p className="flex-1 font-bold">Size</p>
        <p className="flex-1 font-bold">Last Modified</p>
        <div className="flex-[0.20]" />
      </div>
      <div className="mx-3 h-[1px] bg-gray-200 md:mx-5 xl:mx-7"></div>
    </>
  );
}

export default FileHeader;
