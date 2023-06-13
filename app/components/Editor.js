import React, { useState, useEffect } from "react";

export default function Editor({ editorContent, setEditorContent }) {
  const handleChange = (event) => {
    setEditorContent(event.target.value);
  };
  useEffect(() => {
    // placeholder for now - to be retrieved from the db initially.
    fetch("/path-to-your-file.txt")
      .then((response) => response.text())
      .then((data) => {
        setEditorContent(data);
      });
  }, []);

  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center font-r-reg font-medium h-[42px] text-[#7C8187] dark:text-[#C1C4CB] dark:bg-[#1D1F22] bg-[#F5F5F5] p-4 text-sm tracking-[2px]">
        MARKDOWN
      </div>
      <textarea
        className="font-r-mono font-normal text-sm text-[#35393F] dark:text-[#C1C4CB] -tracking-normal w-full h-full resize-none dark:bg-[#151619] bg-white focus:outline-none p-4"
        value={editorContent}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
