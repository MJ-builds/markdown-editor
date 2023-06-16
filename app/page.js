"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import Previewer from "./components/Previewer";
import Editor from "./components/Editor";
import Header from "./components/Header";
import Menu from "./components/Menu";

//fonts
import "@fontsource-variable/roboto-slab";
import "@fontsource-variable/roboto-mono";
import "@fontsource/roboto";
import "@fontsource/roboto/300.css";
import "@fontsource-variable/commissioner";

export default function App() {
  return <Home />;
}

function Home() {
  // document variables - to make more intuitive / rename
  const [documentId, setDocumentId] = useState(null);
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [documents, setDocuments] = useState([]);

  const [previewToggle, setPreviewToggle] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);
  const [theme, setTheme] = useState("dark");

  // may be best to move this to a user context.
  const user = useUser();

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

  return (
    <div className={` ${menuToggle ? "flex" : ""}`}>
      {menuToggle && (
        <Menu
          setEditorContent={setEditorContent}
          setTitle={setTitle}
          setDocumentId={setDocumentId}
          documents={documents}
          setDocuments={setDocuments}
          user={user}
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
          user={user}
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
            user={user}
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
