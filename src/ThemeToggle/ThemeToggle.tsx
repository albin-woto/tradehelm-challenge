import React, {useEffect, useContext} from "react";

import Toggle from "../ui/controls/Toggle";
import ThemeContext, {ThemeContextType} from "../context/theme/ThemeContext";

const ThemeToggle: React.FC = () => {
  const {theme, setTheme} = useContext<ThemeContextType>(ThemeContext);

  const updateToggleSide = (toggleCheck: HTMLInputElement) => {
    if (theme === "dark") {
      toggleCheck.checked = true;
    } else if (theme === "light") {
      toggleCheck.checked = false;
    }
  };

  useEffect(() => {
    const toggleCheck = document.querySelector("#dark-mode-toggle") as HTMLInputElement;

    updateToggleSide(toggleCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return (
    <Toggle
      aria-label="Toggle input for dark-mode"
      htmlFor="dark-mode-toggle"
      id="dark-mode-toggle"
      onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
    />
  );
};

export default ThemeToggle;
