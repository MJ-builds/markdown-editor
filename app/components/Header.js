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
  SigninArrowIcon,
  SigninPersonIcon,
  TitleDocumentIcon,
  WrenchIcon,
} from "./Icons";
import { MenuDialog } from "./ModalDialog";

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
      console.error("Error saving document:", error);
    }
  }

  async function handleDelete() {
    await deleteDocument(documentId)
      .then(async () => {
        console.log("Document deleted!");
        const docs = await listDocuments(user.user.id);
        setDocuments(docs);

        if (docs && docs.length > 0) {
          setTitle(docs[docs.length - 1].title);
          setEditorContent(docs[docs.length - 1].content);
          setDocumentId(docs[docs.length - 1].id);
        } else {
          setTitle("");
          setEditorContent("");
          setDocumentId(null);
        }
      })
      .catch((error) => console.error("Error deleting document:", error));
  }

  return (
    <div className="bg-[#2B2D31] h-[72px] flex flex-row items-center gap-4">
      <div className="h-full ">
        <button
          className="bg-[#35393F] hover:bg-blue-400 w-[72px] h-full flex items-center justify-center"
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
        <div className="text-xs md:text-base">MICK</div>
        <div className="text-xs md:text-base text-blue-300">DOWN</div>
      </div>
      <div className="border-r-[1px] border-[#5A6069] h-12"></div>
      <div className="hidden md:flex flex-row justify-between w-full">
        <div className="flex flex-row items-center w-full">
          <div className="pr-4 ">
            <TitleDocumentIcon />
          </div>
          <div className="w-full">
            <div className="text-[#C1C4CB] text-xs font-r-reg font-light ">
              Document Name
            </div>
            {/* this is where the actual file name goes. below: */}
            <input
              className=" text-white text-sm outline-none grow bg-transparent w-full focus:bg-[#35393F] focus:w-[85%] focus:rounded-[4px]"
              value={title}
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
          <button
            className="flex flex-row items-center justify-center gap-2 p-2 mr-6 text-[#5A6069] hover:text-green-600 scale-125"
            onClick={handleSave}
          >
            <SaveIcon />
          </button>
          <div className="pr-10 flex items-center gap-4">
            <button
              className="text-[#5A6069] hover:text-red-600 flex justify-self-center scale-125"
              onClick={() => documentId && openDeleteModal.showModal()}
            >
              <DeleteIcon />
            </button>
          </div>

          <div className="border-r-[1px] h-12 border-[#5A6069]"></div>
          {/* HIDDEN AND BLOCK - for ref later */}
          <div className="hidden md:flex justify-center items-center pr-4 pl-4 ">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="border-r-[1px] h-12 border-[#5A6069]"></div>
          {/* HIDDEN AND BLOCK - for ref later */}
          <div className="hidden md:block px-6 w-full">
            {!user.isSignedIn ? (
              <SignInButton>
                <button className="flex items-center justify-center h-[40px] w-full pl-4 pr-4 text-blue-600 bg-blue-300 hover:bg-blue-100 rounded-[4px] tracking-[2px] font-commissioner font-bold underline">
                  <div className="flex flex-row text-center">
                    <SigninArrowIcon />
                    <SigninPersonIcon />
                  </div>
                </button>
              </SignInButton>
            ) : (
              <div className="flex flex-row items-center w-fit min-w-max font-commissioner">
                <div className="flex text-sm pr-4 font-normal items-center">
                  Welcome,{" "}
                  <div className="text-blue-100 pl-2 font-bold">
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
