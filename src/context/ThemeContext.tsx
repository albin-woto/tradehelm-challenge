import React, {useEffect, useState, createContext, CSSProperties} from "react";

type ThemeName = "light" | "dark";
export type ThemeContextType = {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  styleProperties: CSSProperties;
};

interface ThemeStyles {
  [key: string]: Record<string, unknown>;
  light: {
    color: string;
    backgroundColor: string;
  };
  dark: {
    color: string;
    backgroundColor: string;
  };
}

const themeColours: ThemeStyles = {
  light: {
    color: "#1e1e1e",
    backgroundColor: "#fff",
  },
  dark: {
    color: "#fafafa",
    backgroundColor: "#1e1e1e",
  },
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ThemeContext = createContext<ThemeContextType>(undefined!);

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({children}: Props): JSX.Element {
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const styleProperties: CSSProperties = {
    backgroundColor: themeColours[themeName].backgroundColor,
    color: themeColours[themeName].color,
  };

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
