import React, { useState } from "react";
import { ThemeDarkIcon, ThemeLightIcon } from "./Icons";

export default function ThemeToggle({ toggleTheme }) {
  const [isChecked, setIsChecked] = useState(false);

  // handles both the toggle and the setting of theme
  const toggleThemeHandler = () => {
    setIsChecked(!isChecked);
    toggleTheme();
  };

  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <ThemeDarkIcon />
      <label className="relative inline-flex items-center cursor-pointer gap-4">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={toggleThemeHandler}
          alt="theme toggle"
        />
        <div className="w-11 h-6 bg-[#757575] rounded-full peer peer-focus:ring-gray-500  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
      <ThemeLightIcon />
    </div>
  );
}
