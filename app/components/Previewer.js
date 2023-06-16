import ReactMarkdown from "react-markdown";
import { PreviewerToggledIcon, PreviewerUntoggledIcon } from "./Icons";

export default function Previewer({
  editorContent,
  previewToggle,
  setPreviewToggle,
  theme,
}) {
  const toggleChange = () => {
    setPreviewToggle(!previewToggle);
  };

  return (
    <div>
      <div
        className={
          previewToggle
            ? "flex items-center justify-between font-r-reg font-medium h-[42px] dark:bg-[#1D1F22] bg-[#F5F5F5] text-[#7C8187] dark:text-[#C1C4CB] p-4 text-sm tracking-[2px] border-l-[1px] border-[#5A6069]"
            : "flex items-center justify-between font-r-reg font-medium h-[42px] dark:bg-[#1D1F22] bg-[#F5F5F5]  text-[#7C8187] dark:text-[#C1C4CB] p-4 text-sm tracking-[2px]"
        }
      >
        PREVIEW
        <button
          value={previewToggle}
          onClick={toggleChange}
          className="text-[#7C8187] hover:text-blue-300"
        >
          {!previewToggle ? (
            <PreviewerToggledIcon />
          ) : (
            <PreviewerUntoggledIcon />
          )}
        </button>
      </div>
      {previewToggle ? (
        <ReactMarkdown
          className={`${theme} markdown font-r-slab dark:bg-[#151619] bg-white border-l-[1px] border-[#5A6069] p-4 w-full h-full resize-none focus:outline-none`}
        >
          {editorContent}
        </ReactMarkdown>
      ) : (
        <div className="flex justify-center dark:bg-[#151619] bg-white min-h-screen">
          <div className="w-[700px]">
            <ReactMarkdown
              className={`${theme} markdown font-r-slab dark:bg-[#151619] bg-white p-4 w-full h-full resize-none focus:outline-none`}
            >
              {editorContent}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
