import React from "react";

export const MenuDialog = ({ title, handleAction, modalAction }) => {
  return (
    <dialog
      id="openDeleteModal"
      className=" dark:bg-[#1D1F22] bg-white md:w-[25%] max-w-[400px] h-fit w-fit p-5 font-r-slab rounded-[4px] backdrop:bg-blue-200 backdrop:opacity-50"
    >
      <h3 className="text-[#35393F] dark:text-white text-2xl font-bold pb-3">
        Delete this document?
      </h3>
      <div className="text-[#7C8187] dark:text-[#C1C4CB] text-sm">{`Are you sure you want to delete '${title}' and it's contents?`}</div>
      <div className="text-[#7C8187] dark:text-[#C1C4CB] text-sm pt-3 font-bold">
        This action cannot be reversed
      </div>
      <form method="dialog">
        <div className="flex flex-row pt-4 gap-4">
          <button
            className="flex flex-row items-center justify-center h-[40px] w-full gap-2 p-2 text-white text-sm bg-blue-600 hover:bg-blue-400 active:bg-blue-900 transition-colors active:duration-150 rounded-[4px] "
            type="submit"
            onClick={handleAction}
          >
            Confirm Delete
          </button>
          <button
            className="flex flex-row items-center justify-center h-[40px] w-full gap-2 p-2 text-white text-sm bg-blue-600 hover:bg-blue-400 active:bg-blue-900 transition-colors active:duration-150 rounded-[4px]"
            type="submit"
            onClick={modalAction}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};
