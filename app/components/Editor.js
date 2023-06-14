import React, { useEffect } from "react";

import { listDocuments } from "../lib/actions";

export default function Editor({
  setDocuments,
  setTitle,
  editorContent,
  setEditorContent,
  setDocumentId,
}) {
  const handleChange = (event) => {
    setEditorContent(event.target.value);
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
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
      } catch (error) {
        console.error("Error getting documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center font-r-reg font-medium h-[42px] text-[#7C8187] dark:text-[#C1C4CB] dark:bg-[#1D1F22] bg-[#F5F5F5] p-4 text-sm tracking-[2px]">
        MARKDOWN
      </div>
      <textarea
        className="font-r-mono font-normal text-sm text-[#35393F] dark:text-[#C1C4CB] -tracking-normal w-full h-full resize-none dark:bg-[#151619] bg-white focus:outline-none p-4"
        value={editorContent}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
