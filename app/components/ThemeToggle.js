import React, { useState } from "react";

export default function ThemeToggle({ theme, toggleTheme }) {
  const [isChecked, setIsChecked] = useState(false);

  // handles both the toggle and the setting of theme
  const handleChange = () => {
    setIsChecked(!isChecked);
    toggleTheme();
  };

  return (
    <div className="flex flex-row justify-center items-center gap-3">
      <svg
        className="with-icon_icon__aLCKg text-[#5A6069] dark:text-blue-300"
        data-testid="geist-icon"
        fill="none"
        height="24"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M17 18a5 5 0 00-10 0" />
        <path d="M12 9V2" />
        <path d="M4.22 10.22l1.42 1.42" />
        <path d="M1 18h2" />
        <path d="M21 18h2" />
        <path d="M18.36 11.64l1.42-1.42" />
        <path d="M23 22H1" />
        <path d="M16 5l-4 4-4-4" />
      </svg>
      <label className="relative inline-flex items-center cursor-pointer gap-4">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isChecked}
          onChange={handleChange}
          alt="theme toggle"
        />
        <div className="w-11 h-6 bg-[#757575] rounded-full peer peer-focus:ring-gray-500  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      </label>
      <svg
        className="with-icon_icon__aLCKg dark:text-[#5A6069] text-blue-300"
        data-testid="geist-icon"
        fill="none"
        height="24"
        shapeRendering="geometricPrecision"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        width="24"
      >
        <path d="M17 18a5 5 0 00-10 0" />
        <path d="M12 2v7" />
        <path d="M4.22 10.22l1.42 1.42" />
        <path d="M1 18h2" />
        <path d="M21 18h2" />
        <path d="M18.36 11.64l1.42-1.42" />
        <path d="M23 22H1" />
        <path d="M8 6l4-4 4 4" />
      </svg>
    </div>
  );
}
