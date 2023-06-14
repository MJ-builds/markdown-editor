"use client";

import React, { useState, useEffect } from "react";

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
  // document variables - to make more intuitive / rename
  const [documentId, setDocumentId] = useState(null);
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("Loading...");
  const [documents, setDocuments] = useState([]);

  const [previewToggle, setPreviewToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const [theme, setTheme] = useState("dark");

  // to be moved most likely.
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  useEffect(() => {
    document.documentElement.classList.add(theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  // to be removed after testing.
  useEffect(() => {
    console.log("Theme is now " + theme);
  }, [theme]);

  return (
    //this div currently causes the preview only screen to be out of whack. Remove and it works.
    <div className={` ${menuToggle ? "flex" : ""}`}>
      {menuToggle && (
        <Menu
          setEditorContent={setEditorContent}
          setTitle={setTitle}
          setDocumentId={setDocumentId}
          documents={documents}
          setDocuments={setDocuments}
        />
      )}

      <main
        className={`${theme} text-[#C1C4CB] bg-[#2B2D31] flex flex-col font-r-reg w-full`}
      >
        <Header
          title={title}
          setTitle={setTitle}
          menuToggle={menuToggle}
          setMenuToggle={setMenuToggle}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          documentId={documentId}
          setDocumentId={setDocumentId}
          documents={documents}
          setDocuments={setDocuments}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* min-w-[370px] md:min-w-[737px] md:max-w-[1440px]  
      had this included below before - but may not be needed given grid */}

        {/* Always render Editor, but hide it when previewToggle is false */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 w-auto ${
            previewToggle ? "" : "hidden"
          }`}
        >
          <Editor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            setDocuments={setDocuments}
            setTitle={setTitle}
            setDocumentId={setDocumentId}
          />
          <Previewer
            editorContent={editorContent}
            previewToggle={previewToggle}
            setPreviewToggle={setPreviewToggle}
          />
        </div>
        {/* Always render Previewer, but hide it when previewToggle is true */}
        <div
          className={`grid grid-cols-1 w-auto ${previewToggle ? "hidden" : ""}`}
        >
          <Previewer
            editorContent={editorContent}
            previewToggle={previewToggle}
            setPreviewToggle={setPreviewToggle}
            theme={theme}
          />
        </div>
      </main>
    </div>
  );
}
