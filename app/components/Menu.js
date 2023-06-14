import { listDocuments } from "../lib/actions";

import { useEffect } from "react";

import Lister from "./Lister";

export default function Menu({
  setEditorContent,
  setTitle,
  setDocumentId,
  documents,
  setDocuments,
}) {
  useEffect(() => {
    const fetchDocuments = async () => {
      const docs = await listDocuments();
      setDocuments(docs);
    };

    fetchDocuments();
  }, []);

  return (
    <div className="flex flex-col items-start justify-between w-[20%] bg-[#1D1F22] h-screen">
      <div className="flex flex-col justify-center w-full p-4 gap-4">
        <div className="flex font-r-reg font-medium text-sm text-0[#7C8187] tracking-[2px] pt-3">
          MY DOCUMENTS
        </div>
        <button
          onClick={(e) => {
            setTitle("");
            setEditorContent("");
            setDocumentId(null);
          }}
          className="flex flex-row items-center justify-center h-[40px] w-full gap-2 p-2 mt-[10px] mr-4 text-white bg-blue-600 hover:bg-blue-400 rounded-[4px]"
        >
          <div className="flex flex-row items-center text-sm gap-2">
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
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M12 18v-6" />
              <path d="M9 15h6" />
            </svg>{" "}
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
          />
        </div>
      </div>
    </div>
  );
}
