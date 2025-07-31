function FileHeader() {
  return (
    <>
      <div className="flex items-center justify-between px-3 py-2 text-xs md:px-5 lg:text-base xl:px-7">
        <p className="flex-[1.6] font-bold">File Name</p>
        <p className="hidden font-bold sm:flex sm:flex-1">Type</p>
        <p className="hidden flex-1 font-bold sm:flex">Size</p>
        <p className="hidden flex-1 font-bold sm:flex">Last Modified</p>
        <div className="flex-[0.20]" />
      </div>
      <div className="mx-3 h-[1px] bg-gray-200 md:mx-5 xl:mx-7"></div>
    </>
  );
}

export default FileHeader;
