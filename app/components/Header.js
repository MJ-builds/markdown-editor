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
        setTitle("");
        setEditorContent("");
        setDocumentId(null);
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
      <div className="flex flex-row font-bold text-white tracking-[5px] font-commissioner">
        MICKDOWN<div className="text-blue-600">.COM</div>
      </div>
      <div className="border-r-[1px] border-[#5A6069] h-12"></div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row items-center w-full">
          <div className=" pr-4">
            <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z"
                fill="#FFF"
              />
            </svg>
          </div>
          <div className="w-full">
            <div className="text-[#C1C4CB] text-xs font-r-reg font-light ">
              Document Name
            </div>
            {/* this is where the actual file name goes. below: */}
            <input
              className=" text-blue-300 text-sm outline-none grow bg-transparent w-full"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div className="pr-6 flex items-center gap-4">
            <button
              className="text-white hover:text-red-600 flex justify-self-center scale-125"
              onClick={() => documentId && openDeleteModal.showModal()}
            >
              <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 16a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM17 4h-4V3a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v1H1a1 1 0 1 0 0 2h1v11a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6h1a1 1 0 0 0 0-2ZM7 3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1H7V3Zm7 14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6h10v11Zm-3-1a1 1 0 0 0 1-1V9a1 1 0 0 0-2 0v6a1 1 0 0 0 1 1Z"
                  fill="currentColor"
                />
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
          <button
            className="flex flex-row items-center justify-center gap-2 p-2 mr-6 text-white hover:text-green-600 scale-150"
            onClick={handleSave}
          >
            <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.91 5.931 10.575.598A.889.889 0 0 0 10.29.41.969.969 0 0 0 9.945.34H2.834A2.667 2.667 0 0 0 .167 3.007v10.666a2.667 2.667 0 0 0 2.667 2.667H13.5a2.667 2.667 0 0 0 2.667-2.667v-7.11a.889.889 0 0 0-.258-.632ZM5.5 2.118h3.556v1.778H5.5V2.118Zm5.334 12.444H5.5v-2.666c0-.491.398-.89.89-.89h3.555c.49 0 .889.399.889.89v2.666Zm3.555-.889c0 .491-.398.89-.889.89h-.889v-2.667a2.667 2.667 0 0 0-2.666-2.667H6.389a2.667 2.667 0 0 0-2.666 2.667v2.666h-.89a.889.889 0 0 1-.888-.889V3.007c0-.491.398-.89.889-.89h.889v2.667c0 .491.398.89.888.89h5.334c.49 0 .889-.399.889-.89V3.371l3.555 3.556v6.746Z"
                fill="currentColor"
              />
            </svg>
          </button>
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
                  <div className="text-blue-600 pl-2 font-bold">
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
