export default function Editor() {
  return (
    <div className="w-full min-h-screen">
      <textarea
        className="w-full h-full resize-none bg-[#151619] focus:outline-none p-4"
        defaultValue="placeholder"
      ></textarea>
    </div>
  );
}
