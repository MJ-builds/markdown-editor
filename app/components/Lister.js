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
                className="text-blue-600"
                width="14"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.107 3.393c.167.167.31.393.429.678.119.286.178.548.178.786v10.286c0 .238-.083.44-.25.607a.827.827 0 0 1-.607.25h-12a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V.857C0 .62.083.417.25.25A.827.827 0 0 1 .857 0h8c.238 0 .5.06.786.179.286.119.512.261.678.428l2.786 2.786ZM9.143 1.214v3.357H12.5c-.06-.172-.125-.294-.196-.366L9.509 1.411c-.072-.072-.194-.137-.366-.197Zm3.428 13.643V5.714H8.857a.827.827 0 0 1-.607-.25.827.827 0 0 1-.25-.607V1.143H1.143v13.714H12.57Z"
                  fill="currentColor"
                />
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
