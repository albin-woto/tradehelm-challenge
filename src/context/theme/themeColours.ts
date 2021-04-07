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

export const themeColours: ThemeStyles = {
  light: {
    color: "#1e1e1e",
    backgroundColor: "#fff",
  },
  dark: {
    color: "#fafafa",
    backgroundColor: "#1e1e1e",
  },
};
