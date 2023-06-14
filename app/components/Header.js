import React from "react";

import { SignInButton, useUser, UserButton } from "@clerk/nextjs";

import {
  listDocuments,
  saveOrUpdateDocument,
  deleteDocument,
} from "../lib/actions";

import ThemeToggle from "./ThemeToggle";

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
}) {
  const user = useUser();
  console.log(user);

  const handleChange = () => {
    setMenuToggle(!menuToggle);
  };

  async function handleSave() {
    try {
      const savedDocument = await saveOrUpdateDocument(
        documentId,
        title,
        editorContent
      );
      // Update documentId with the id of the saved document
      setDocumentId(savedDocument.id);
      console.log("Document saved!");
      const docs = await listDocuments();
      setDocuments(docs);
    } catch (error) {
      console.error("Error saving document:", error);
    }
  }

  async function handleDelete() {
    await deleteDocument(documentId)
      .then(async () => {
        console.log("Document deleted!");
        const docs = await listDocuments();
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
          onClick={handleChange}
        >
          {/* adjust to menuToggle (true) to keep in line with rest of code */}
          {!menuToggle ? (
            <svg width="30" height="18" xmlns="http://www.w3.org/2000/svg">
              <g fill="#FFF" fillRule="evenodd">
                <path d="M0 0h30v2H0zM0 8h30v2H0zM0 16h30v2H0z" />
              </g>
            </svg>
          ) : (
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <g fill="#FFF" fillRule="evenodd">
                <path d="M2.1.686 23.315 21.9l-1.415 1.415L.686 2.1z" />
                <path d="M.686 21.9 21.9.685l1.415 1.415L2.1 23.314z" />
              </g>
            </svg>
          )}
        </button>
      </div>
      <div className="flex flex-row font-bold text-white tracking-[5px] font-commissioner items-center">
        <div className="text-blue-300 text-4xl pr-4 pl-2 scale-150">
          <svg
            className="with-icon_icon__aLCKg"
            data-testid="geist-icon"
            fill="none"
            height="24"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        <div>MICK</div>
        <div className="text-blue-300">DOWN</div>
      </div>
      <div className="border-r-[1px] border-[#5A6069] h-12"></div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center w-full">
          <div className=" pr-4">
            <svg
              className="with-icon_icon__aLCKg"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M7.06883 21.6H16.219C18.7973 21.6 20.8879 19.5093 20.8879 16.9312V5.86885C20.8879 3.29074 18.7973 1.20001 16.219 1.20001H7.06883C4.49072 1.20001 2.39999 3.29074 2.39999 5.86885V16.9312C2.39999 19.5093 4.49072 21.6 7.06883 21.6Z" />
              <path d="M15.3946 15.842H7.89178M15.3946 11.245H7.89178M10.755 6.6586H7.89232" />
            </svg>
          </div>
          <div className="w-full">
            <div className="text-[#C1C4CB] text-xs font-r-reg font-light ">
              Document Name
            </div>
            {/* this is where the actual file name goes. below: */}
            <input
              className=" text-white text-sm outline-none grow bg-transparent w-full"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <button
            className="flex flex-row items-center justify-center gap-2 p-2 mr-6 text-[#5A6069] hover:text-green-600 scale-125"
            onClick={handleSave}
          >
            <svg
              className="with-icon_icon__aLCKg"
              data-testid="geist-icon"
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
              <path d="M17 21v-8H7v8" />
              <path d="M7 3v5h8" />
            </svg>
          </button>
          <div className="pr-10 flex items-center gap-4">
            <button
              className="text-[#5A6069] hover:text-red-600 flex justify-self-center scale-125"
              onClick={() => documentId && openDeleteModal.showModal()}
            >
              <svg
                className="with-icon_icon__aLCKg"
                data-testid="geist-icon"
                fill="none"
                height="24"
                shapeRendering="geometricPrecision"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2z" />
                <path d="M18 9l-6 6" />
                <path d="M12 9l6 6" />
              </svg>
            </button>
          </div>
          <dialog
            id="openDeleteModal"
            className="dark:bg-[#1D1F22] bg-white w-[25%] h-fit p-5 font-r-slab rounded-[4px]"
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
                  className="flex flex-row items-center justify-center h-[40px] w-full gap-2 p-2 text-white text-sm bg-blue-600 hover:bg-blue-400 rounded-[4px] "
                  type="submit"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
                <button
                  className="flex flex-row items-center justify-center h-[40px] w-full gap-2 p-2 text-white text-sm bg-blue-600 hover:bg-blue-400 rounded-[4px]"
                  type="submit"
                  onClick={() => openDeleteModal.close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </dialog>
          <div className="border-r-[1px] h-12 border-[#5A6069]"></div>
          <div className="flex justify-center items-center pr-4 pl-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <div className="border-r-[1px] h-12 border-[#5A6069]"></div>
          <div className="px-6 w-full">
            {!user.isSignedIn ? (
              <SignInButton>
                <button className="flex items-center justify-center h-[40px] w-[152px] text-white bg-blue-600 hover:bg-blue-400 rounded-[4px] tracking-[2px] font-commissioner font-bold underline">
                  SIGN-IN
                </button>
              </SignInButton>
            ) : (
              <div className="flex flex-row items-center w-fit min-w-max font-commissioner">
                <div className="text-sm pr-4 flex font-normal items-center">
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
