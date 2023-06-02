export default function Editor() {
  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center font-r-reg font-medium h-[42px] bg-[#1D1F22] p-4 text-sm tracking-[2px]">
        MARKDOWN
      </div>
      <textarea
        className="w-full h-full resize-none bg-[#151619] focus:outline-none p-4"
        defaultValue="placeholder"
      ></textarea>
    </div>
  );
}
