import React from "react";
import { useThemeProvider } from "../hooks/useThemeProvider";

export default function ThemeToggle() {
  const { currentTheme, changeCurrentTheme } = useThemeProvider();

  return (
    <div className="">
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={currentTheme === "light"}
        onChange={() => changeCurrentTheme(currentTheme === "light" ? "dark" : "light")}
      />
      <label
        className="flex items-center justify-center cursor-pointer transition-all w-8 h-8 bg-gray-200 dark:bg-gray-700 hover:bg-gray-100 lg:hover:bg-gray-200 dark:hover:bg-gray-700/50 dark:lg:hover:bg-gray-800 rounded-full"
        htmlFor="light-switch"
      >
        {/* className="dark:hidden block fill-current z-10 text-gray-500 dark:text-gray-400" */}
        <svg
          className="block dark:hidden fill-current text-gray-500 transition-all dark:text-gray-400" xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false"> <title>Light theme (sun)</title> <g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"> <circle cx="12" cy="12" r="4" /> <path d="M12 2v2" /> <path d="M12 20v2" /> <path d="M4.93 4.93l1.41 1.41" /> <path d="M17.66 17.66l1.41 1.41" /> <path d="M2 12h2" /> <path d="M20 12h2" /> <path d="M4.93 19.07l1.41-1.41" /> <path d="M17.66 6.34l1.41-1.41" /> </g> </svg>

        <svg
          className="hidden dark:block fill-current transition-all text-gray-500 dark:text-gray-400"
          width={16}
          height={16}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.875 4.375a.625.625 0 1 0 1.25 0c.001-.69.56-1.249 1.25-1.25a.625.625 0 1 0 0-1.25 1.252 1.252 0 0 1-1.25-1.25.625.625 0 1 0-1.25 0 1.252 1.252 0 0 1-1.25 1.25.625.625 0 1 0 0 1.25c.69.001 1.249.56 1.25 1.25Z" />
          <path d="M7.019 1.985a1.55 1.55 0 0 0-.483-1.36 1.44 1.44 0 0 0-1.53-.277C2.056 1.553 0 4.5 0 7.9 0 12.352 3.648 16 8.1 16c3.407 0 6.246-2.058 7.51-4.963a1.446 1.446 0 0 0-.25-1.55 1.554 1.554 0 0 0-1.372-.502c-4.01.552-7.539-2.987-6.97-7ZM2 7.9C2 5.64 3.193 3.664 4.961 2.6 4.82 7.245 8.72 11.158 13.36 11.04 12.265 12.822 10.341 14 8.1 14 4.752 14 2 11.248 2 7.9Z" />
        </svg>
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
