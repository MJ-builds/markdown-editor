"use client";

import Previewer from "./components/Previewer";
import Editor from "./components/Editor";
import Header from "./components/Header";

//fonts
import '@fontsource-variable/roboto-slab';
import '@fontsource-variable/roboto-mono';
import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource-variable/commissioner';

export default function App() {
  return <Home />;
}

function Home() {
  return (
    <main className="text-[#C1C4CB] bg-[#2B2D31] flex flex-col font-r-reg">
      <Header />
      {/* min-w-[370px] md:min-w-[737px] md:max-w-[1440px]  
      had this included below before - but may not be needed given grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-auto ">
        <Editor />
        <Previewer />
      </div>
    </main>
  );
}
