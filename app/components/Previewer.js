import ReactMarkdown from "react-markdown";
import Editor from "./Editor";

export default function Previewer() {
  return (
    // editor content to be placed below 
    <ReactMarkdown className="bg-[#151619] border-l-[1px] border-[#5A6069] p-4">
      {/* <Editor /> */}
      Test md: I just love **bold text**
    </ReactMarkdown>
  );
}
