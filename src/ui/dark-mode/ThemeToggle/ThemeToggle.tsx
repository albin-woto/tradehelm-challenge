import React, {useEffect} from "react";

import styles from "./ThemeToggle.module.scss";

type localTheme = string | null;

const ThemeToggle: React.FC = () => {
  // Check for dark mode preference at the OS level
  const prefersDarkScheme: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme: localTheme = localStorage.getItem("theme");

  // Get the user's theme preference from local storage, if it's available
  const getLocalTheme = (currentTheme: string, toggleCheck: HTMLInputElement) => {
    if (currentTheme == "dark") {
      document.body.classList.toggle("dark-mode");
      toggleCheck.checked = true;
    } else if (currentTheme == "light") {
      toggleCheck.checked = false;
    }
  };

  const handleClick = () => {
    if (prefersDarkScheme.matches) {
      document.body.classList.toggle("dark-mode");
    } else {
      document.body.classList.toggle("dark-mode");
    }
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";

    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const toggleCheck = document.getElementById("dark-mode-toggle") as HTMLInputElement;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    getLocalTheme(currentTheme!, toggleCheck);
    toggleCheck.addEventListener("change", handleClick);

    return () => {
      toggleCheck.removeEventListener("change", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.toggle} id={styles.toggle}>
      <input className={styles.toggle__input} id="dark-mode-toggle" type="checkbox" />
      <label
        aria-label="Dark mode toggle"
        className={styles.toggle__label}
        htmlFor="dark-mode-toggle"
      >
        <div className={styles.toggle__ball} />
      </label>
    </div>
  );
};

export default ThemeToggle;
