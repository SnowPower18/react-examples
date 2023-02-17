import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { HiDesktopComputer, HiMoon, HiSun } from "react-icons/hi";

// Color Palette
// https://coolors.co/182825-016fb9-2ca58d-84bc9c-fffdf7

type Theme = "sys" | "dark" | "light";

function getSavedTheme(): Theme {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme == "sys" || storedTheme == "dark" || storedTheme == "light") {
    return storedTheme;
  }
  return "sys";
}

const Home: NextPage = () => {
  const [theme, setTheme] = useState<Theme>();
  //used to remove remove listener when changing from sys to another mode
  const prevTheme = useRef<Theme>();
  //needed because events on MediaQueryLists can be removed only
  //using the object on which they were created
  const darkModeMedia = useRef<MediaQueryList>();

  function themeListener(e: MediaQueryListEvent) {
    if (e.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  //load stored preferences
  useEffect(() => {
    if (theme == undefined) {
      setTheme(getSavedTheme());
    }
    if (darkModeMedia.current == undefined) {
      darkModeMedia.current = window.matchMedia("(prefers-color-scheme: dark)");
    }
  }, []);

  useEffect(() => {
    if (darkModeMedia.current == undefined) {
      darkModeMedia.current = window.matchMedia("(prefers-color-scheme: dark)");
    }
    //remove old media listener
    if (prevTheme.current === "sys")
      darkModeMedia.current.removeEventListener("change", themeListener);

    //add or remove 'dark' class on html tag
    if (theme === "sys") {
      //update theme to system theme
      if (darkModeMedia.current.matches)
        document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");

      //add media listener
      darkModeMedia.current.addEventListener("change", themeListener);
      localStorage.setItem("theme", "sys");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    prevTheme.current = theme;

    return () => {
      if (theme === "sys" && darkModeMedia.current != undefined)
        darkModeMedia.current.removeEventListener("change", themeListener);
    };
  }, [theme]);

  return (
    <>
      <Head>
        <title>React Examples</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="flex min-h-screen w-screen flex-col items-center bg-slate-300 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
        <nav className="flex w-screen items-center bg-slate-400 p-4 dark:bg-slate-700">
          <h2 className="mr-auto ml-2 text-2xl font-semibold">
            DarkMode Example
          </h2>
          <ThemeSwitcher theme={theme} setTheme={setTheme} />
        </nav>
        <div className="w-1/2 pt-12">
          <p className="text-lg">
            This is an example of a theme switcher with Dark, Light and System
            mode that also persists preferences in localStorage. It makes use of
            the dark mode implemented by Tailwind CSS and event listeners of the{" "}
            <span className="rounded-md bg-slate-400/30">
              `prefers-color-scheme`
            </span>{" "}
            media query in order implement the System mode.
          </p>
          <p className="text-lg">
            For this example to work the{" "}
            <span className="rounded-md bg-slate-400/30">
              `darkMode: 'class'`
            </span>{" "}
            option has to be added in the Tailwind config.
          </p>
        </div>
      </div>
    </>
  );
};

function ThemeSwitcher({
  theme,
  setTheme,
}: {
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
}) {
  return (
    <div className="text-slate-800 dark:text-slate-300">
      <button
        onClick={() => theme !== "light" && setTheme("light")}
        className={`p-2 ${
          theme == "light"
            ? "rounded-md ring-2 ring-slate-800 dark:ring-slate-300"
            : ""
        }`}
      >
        <HiSun />
      </button>
      <button
        onClick={() => theme !== "dark" && setTheme("dark")}
        className={`p-2 ${
          theme == "dark"
            ? "rounded-md ring-2 ring-slate-800 dark:ring-slate-300"
            : ""
        }`}
      >
        <HiMoon />
      </button>
      <button
        onClick={() => theme !== "sys" && setTheme("sys")}
        className={`p-2 ${
          theme == "sys"
            ? "rounded-md ring-2 ring-slate-800 dark:ring-slate-300"
            : ""
        }`}
      >
        <HiDesktopComputer />
      </button>
    </div>
  );
}

export default Home;
