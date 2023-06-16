export const setLastDocumentInfo = (
  docs,
  setTitle,
  setEditorContent,
  setDocumentId
) => {
  if (docs && docs.length > 0) {
    const lastDoc = docs[docs.length - 1];
    setTitle(lastDoc.title);
    setEditorContent(lastDoc.content);
    setDocumentId(lastDoc.id);
  } else {
    setTitle("");
    setEditorContent("");
    setDocumentId(null);
  }
};
