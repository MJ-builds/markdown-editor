import React from "react";

import { SignInButton, UserButton } from "@clerk/nextjs";

import {
  listDocuments,
  saveOrUpdateDocument,
  deleteDocument,
} from "../lib/actions";

import ThemeToggle from "./ThemeToggle";
import {
  DeleteIcon,
  MenuCloseIcon,
  MenuIcon,
  SaveIcon,
  SigninPersonIcon,
  TitleDocumentIcon,
  WrenchIcon,
} from "./Icons";
import { MenuDialog } from "./ModalDialog";
import { setLastDocumentInfo } from "../lib/documentHelpers";

export default function Header({
  title,
  setTitle,
  menuToggle,
  setMenuToggle,
  editorContent,
  setEditorContent,
  documentId,
  setDocumentId,
  setDocuments,
  theme,
  toggleTheme,
  user,
}) {
  const menuToggleHandler = () => {
    setMenuToggle(!menuToggle);
  };

  async function handleSave() {
    if (user && user.user) {
      try {
        const savedDocument = await saveOrUpdateDocument(
          documentId,
          title,
          editorContent,
          user.user.id
        );
        // Update documentId with the id of the saved document
        setDocumentId(savedDocument.id);
        console.log("Document saved!");
        const docs = await listDocuments(user.user.id);
        setDocuments(docs);
      } catch (error) {
        console.error("Error saving document:", error.message);
      }
    } else {
      console.log("Cannot create/update - no authorised user is logged in");
    }
  }

  async function handleDelete() {
    if (user && user.user) {
      await deleteDocument(documentId, user.user.id)
        .then(async () => {
          console.log("Document deleted!");
          const docs = await listDocuments(user.user.id);
          setDocuments(docs);
          setLastDocumentInfo(docs, setTitle, setEditorContent, setDocumentId);
        })
        .catch((error) => console.error("Error deleting document:", error));
    } else {
      console.log("Cannot delete - no authorised user is logged in");
    }
  }

  return (
    <div className="dark:bg-[#2B2D31] bg-slate-200 h-[72px] flex flex-row items-center gap-4">
      <div className="h-full ">
        <button
          className="dark:bg-[#35393F] bg-[#757575] hover:bg-blue-400 active:bg-blue-900 dark:hover:bg-blue-400 dark:active:bg-blue-900 transition-colors active:duration-150 w-[72px] h-full flex items-center justify-center"
          value={menuToggle}
          onClick={menuToggleHandler}
        >
          {/* adjust to menuToggle (true) to keep in line with rest of code */}
          {!menuToggle ? <MenuIcon /> : <MenuCloseIcon />}
        </button>
      </div>
      <div className="flex flex-row font-bold text-white tracking-[5px] font-commissioner items-center">
        <div className="text-blue-300 pr-4 md:pl-2 md:scale-150 scale-90">
          <WrenchIcon />
        </div>
        <div className="text-xs md:text-base text-[#757575] dark:text-white">
          MICK
        </div>
        <div className="text-xs md:text-base text-blue-300">DOWN</div>
      </div>
      <div className="border-r-[1px] dark:border-[#5A6069] border-[#757575] h-12"></div>
      <div className="hidden md:flex flex-row justify-between w-full">
        <div className="flex flex-row items-center w-full">
          <div className="pr-4 text-[#757575] dark:text-[#5A6069]">
            <TitleDocumentIcon />
          </div>
          <div className="w-full">
            <div className="dark:text-[#C1C4CB] text-[#757575] text-xs font-r-reg font-light ">
              Document Name
            </div>
            {/* this is where the actual file name goes. below: */}
            <input
              className=" text-[#35393F] dark:text-white text-sm dark:placeholder:opacity-100 placeholder:opacity-50 placeholder:italic placeholder:text-[12px] placeholder:text-slate-600 outline-none grow bg-transparent focus:dark:bg-transparent w-full focus:bg-slate-200 focus:w-[72%] focus:rounded-[4px]"
              value={title}
              placeholder="Give your document a title..."
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
        </div>
        <MenuDialog
          title={title}
          handleAction={handleDelete}
          modalAction={() => openDeleteModal.close()}
        />
        <div className="flex flex-row items-center">
          {user?.user ? (
            <>
              <button
                className="flex flex-row items-center justify-center gap-2 p-2 mr-6 text-[#5A6069] hover:text-blue-600 active:text-blue-900 transition-colors active:duration-150 scale-125"
                onClick={handleSave}
              >
                <SaveIcon />
              </button>
              <div className="pr-10 flex items-center gap-4">
                <button
                  className="flex justify-self-center text-[#5A6069] hover:text-blue-600 active:text-blue-900 transition-colors active:duration-150 scale-125"
                  onClick={() => documentId && openDeleteModal.showModal()}
                >
                  <DeleteIcon />
                </button>
              </div>
            </>
          ) : null}
          <div className="border-r-[1px] h-12 dark:border-[#5A6069] border-[#757575]"></div>
          {/* HIDDEN AND BLOCK - for ref later */}
          <div className="hidden md:flex justify-center items-center pr-4 pl-4 ">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="border-r-[1px] h-12 dark:border-[#5A6069] border-[#757575]"></div>
          {/* HIDDEN AND BLOCK - for ref later */}
          <div className="hidden md:block px-6 w-full">
            {!user.isSignedIn ? (
              <SignInButton>
                <button className="flex items-center justify-center h-[40px] w-[80px] pl-4 pr-4 text-blue-600 bg-blue-300 hover:text-slate-200 hover:bg-blue-600 rounded-[4px] tracking-[2px] font-commissioner font-bold underline">
                  <div className="flex flex-row text-center">
                    <SigninPersonIcon />
                  </div>
                </button>
              </SignInButton>
            ) : (
              <div className="flex flex-row items-center w-fit min-w-max font-commissioner">
                <div className="flex text-sm pr-4 font-normal items-center text-[#757575]">
                  Welcome,{" "}
                  <div className="dark:text-blue-100 text-[#757575] pl-2 font-bold">
                    {" "}
                    {user.user.username}
                  </div>
                </div>
                <div className="scale-125">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
