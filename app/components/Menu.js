import { listDocuments } from "../lib/actions";

import { useEffect } from "react";

import Lister from "./Lister";
import { MenuNewDocumentIcon } from "./Icons";
import { SignInButton } from "@clerk/nextjs";

export default function Menu({
  setEditorContent,
  setTitle,
  setDocumentId,
  documents,
  setDocuments,
  user,
}) {
  const createNewDocument = () => {
    setTitle("");
    setEditorContent("");
    setDocumentId(null);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      if (user && user.user) {
        const docs = await listDocuments(user.user.id);
        setDocuments(docs);
      } else {
        // clean up if user has logged out. may move this useEffect elsewhere
        setTitle("");
        setEditorContent("");
        setDocumentId(null);
        setDocuments([]);
      }
    };

    fetchDocuments();
  }, [user.user]);

  return (
    <>
      {user && user.user ? (
        <div className="flex flex-col items-start justify-between w-[300px] md:w-[20%] bg-slate-200 dark:bg-[#1D1F22]  h-screen md:max-w-[300px]">
          <div className="flex flex-col justify-center w-screen md:w-full p-4 gap-4">
            <div className="flex font-r-reg font-medium text-sm text-[#757575] tracking-[2px] pt-3">
              MY DOCUMENTS
            </div>

            <button
              onClick={createNewDocument}
              className="flex flex-row items-center justify-center h-[40px] w-[60%] md:w-full gap-2 p-2 mt-[10px] mr-4 text-white bg-blue-600 hover:bg-blue-400 active:bg-blue-900 transition-colors active:duration-450 rounded-[4px]"
            >
              <div className="flex flex-row items-center text-sm gap-2">
                <MenuNewDocumentIcon />
                New Document{" "}
              </div>
            </button>

            {/* call from the db - todo: change name of component. */}
            <div className="flex flex-row h-full">
              {/* passing a function from Menu to Lister that will be called with the document's 
          content when the document name is clicked. Then, in Menu, you can call setEditorContent 
          with the document's content that was passed to the function. */}
              <Lister
                setEditorContent={setEditorContent}
                setTitle={setTitle}
                setDocumentId={setDocumentId}
                documents={documents}
                // unsure if needed as yet:
                setDocuments={setDocuments}
                user={user}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex w-[300px] md:w-[20%] md:max-w-[300px] justify-center items-start dark:bg-[#1D1F22] bg-slate-200 pt-2">
          <div className="flex w-screen h-[90%] dark:bg-[#1D1F22] bg-slate-200 items-center justify-center">
            <div className="flex items-center p-4 font-r-reg font-thin">
              <div className="dark:text-white text-[#7C8187]">
                Please{" "}
                <SignInButton className="text-blue-600 font-bold">
                  sign-in
                </SignInButton>{" "}
                to view your saved documents
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
