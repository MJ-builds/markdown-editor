import { ListedDocumentIcon } from "./Icons";

export default function Lister({
  setTitle,
  setEditorContent,
  setDocumentId,
  documents,
  user,
}) {
  const loadTargetDocument = (title, content, id) => {
    setTitle(title);
    setEditorContent(content);
    setDocumentId(id);
  };

  // only run the return once user exists and/or loads
  if (!user || !user.user || !user.user.id) {
    return null;
  }

  return (
    <div className="pt-5 w-full">
      {documents &&
        // thought i'd create a new array to sort, so that it does not interfere with the original array.
        [...documents]
          // filter the documents to only show the ones that belong to the user.
          .filter((document) => document.userId === user.user.id)
          // sort the documents by createdAt date. Most recent first.
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((document) => (
            <div
              key={document.id}
              className="flex flex-row pt-3 items-center gap-4 rounded-[4px] dark:bg-[#2B2D31] bg-slate-200 mb-2 p-2"
            >
              <ListedDocumentIcon />
              <div className="flex flex-col">
                <div className="font-normal font-r-reg text-[0.8125em] flex items-center text-blue-300 dark:text-blue-200">
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
                  className="font-normal font-r-reg text-sm tracking-[1px] text-[#757575] dark:text-white hover:text-blue-400 hover:cursor-pointer active:text-blue-900 transition-colors active:duration-450"
                  onClick={() => {
                    loadTargetDocument(
                      document.title,
                      document.content,
                      document.id
                    );
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
