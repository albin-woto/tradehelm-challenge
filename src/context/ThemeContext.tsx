import React, {useEffect, useState, createContext, CSSProperties} from "react";

import {themeColours} from "./themeColours";

type ThemeName = "light" | "dark";
export type ThemeContextType = {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  styleProperties: CSSProperties;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ThemeContext = createContext<ThemeContextType>(undefined!);

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({children}: Props): JSX.Element {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  // Styles to use in primary components
  const styleProperties: CSSProperties = {
    backgroundColor: themeColours[themeName].backgroundColor,
    color: themeColours[themeName].color,
  };

  // Search for theme preference and set it
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

    setTheme(prefersDarkScheme ? "dark" : "light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{theme: themeName, setTheme, styleProperties}}>
      {children}
    </ThemeContext.Provider>
  );
}

export {ThemeProvider as Provider, ThemeContext as default};
