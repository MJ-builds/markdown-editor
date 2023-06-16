import React, { useEffect } from "react";

import { listDocuments } from "../lib/actions";
import { setLastDocumentInfo } from "../lib/documentHelpers";

export default function Editor({
  setDocuments,
  setTitle,
  editorContent,
  setEditorContent,
  setDocumentId,
  user,
}) {
  const contentHandler = (event) => {
    setEditorContent(event.target.value);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      if (user && user.user) {
        try {
          const docs = await listDocuments(user.user.id);
          setDocuments(docs);
          setLastDocumentInfo(docs, setTitle, setEditorContent, setDocumentId);
        } catch (error) {
          console.error("Error getting documents:", error);
        }
      }
    };

    fetchDocuments();
  }, [user.user]);

  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center font-r-reg font-medium h-[42px] text-[#7C8187] dark:text-[#C1C4CB] dark:bg-[#1D1F22] bg-[#F5F5F5] p-4 text-sm tracking-[2px]">
        MARKDOWN
      </div>
      <textarea
        className="font-r-mono font-normal text-sm text-[#35393F] dark:text-[#C1C4CB] placeholder:italic placeholder:text-slate-600 placeholder:opacity-50 dark:placeholder:opacity-100 -tracking-normal w-full h-full resize-none dark:bg-[#151619] bg-white focus:outline-none p-4"
        value={editorContent}
        onChange={contentHandler}
        placeholder={
          user && user.user
            ? "Give your document some markdown content..."
            : "Go ahead and test out the editor by inputting some markdown content here...\n\n(remember that you'll need to sign-in to save, update, view, or delete)"
        }
      ></textarea>
    </div>
  );
}
