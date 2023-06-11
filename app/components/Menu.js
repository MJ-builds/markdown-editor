import Lister from "./Lister";

export default function Menu({setEditorContent}) {

  return (
    <div className="flex flex-col items-center w-[20%] bg-[#1D1F22]">
      <div className="flex flex-col justify-center w-full p-4 gap-4">
        <div className="flex font-r-reg font-medium text-sm text-[#7C8187] tracking-[2px] pt-3">
          MY DOCUMENTS
        </div>
        <button onClick ={(e) => setEditorContent('')} className="flex flex-row items-center justify-center h-[40px] w-full gap-2 p-2 mt-[10px] mr-4 text-white bg-[#E46643] hover:bg-[#F39765] rounded-[4px]">
          <div className="text-sm">+ New Document </div>
        </button>
        {/* call from the db - todo: change name of component. */}
        <div className="flex flex-row h-full">
          {/* passing a function from Menu to Lister that will be called with the document's 
          content when the document name is clicked. Then, in Menu, you can call setEditorContent 
          with the document's content that was passed to the function. */}
        <Lister onDocumentClick={setEditorContent} />
            </div>
      </div>
    </div>
  );
}
