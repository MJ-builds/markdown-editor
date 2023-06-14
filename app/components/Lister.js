export default function Lister({
  setTitle,
  setEditorContent,
  setDocumentId,
  documents,
}) {
  return (
    <div className="pt-5">
      {documents &&
        // thought i'd create a new array to sort, so that it does not interfere with the original array.
        [...documents]
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((document) => (
            <div
              key={document.id}
              className="flex flex-row pt-3 items-center gap-4 rounded-[4px] bg-[#2B2D31] mb-2 p-2"
            >
              <svg
                className="with-icon_icon__aLCKg text-blue-400"
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
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
              <div className="flex flex-col">
                <div className="font-normal font-r-reg text-[0.8125em] flex items-center text-blue-200">
                  {document.createdAt.getDate()}{" "}
                  {document.createdAt.toLocaleString("default", {
                    month: "long",
                  })}{" "}
                  {document.createdAt.getFullYear()}{" "}
                  <div className="inline-flex text-[9px] pl-3">
                    {document.createdAt.toLocaleTimeString()}
                  </div>
                </div>
                <div
                  className="font-normal font-r-reg text-sm tracking-[1px] text-white hover:text-blue-600 hover:cursor-pointer"
                  onClick={() => {
                    setTitle(document.title);
                    setEditorContent(document.content);
                    setDocumentId(document.id);
                  }}
                >
                  {document.title}
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
