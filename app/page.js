"use client";

import React, { useState } from "react";

import Previewer from "./components/Previewer";
import Editor from "./components/Editor";
import Header from "./components/Header";

//fonts
import "@fontsource-variable/roboto-slab";
import "@fontsource-variable/roboto-mono";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource-variable/commissioner";
import Menu from "./components/Menu";

export default function App() {
  return <Home />;
}

function Home() {
  const [editorContent, setEditorContent] = useState("Loading...");
  const [previewToggle, setPreviewToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    //this div currently causes the preview only screen to be out of whack. Remove and it works.
    <div className="flex">
      {menuToggle && <Menu />}

      <main className="text-[#C1C4CB] bg-[#2B2D31] flex flex-col font-r-reg">
        <Header menuToggle={menuToggle} setMenuToggle={setMenuToggle} />

        {/* min-w-[370px] md:min-w-[737px] md:max-w-[1440px]  
      had this included below before - but may not be needed given grid */}
        {previewToggle ? (
          <div className="grid grid-cols-1 md:grid-cols-2 w-auto ">
            <Editor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
            />
            <Previewer
              editorContent={editorContent}
              previewToggle={previewToggle}
              setPreviewToggle={setPreviewToggle}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 w-auto">
            <Previewer
              editorContent={editorContent}
              previewToggle={previewToggle}
              setPreviewToggle={setPreviewToggle}
            />
          </div>
        )}
      </main>
    </div>
  );
}
