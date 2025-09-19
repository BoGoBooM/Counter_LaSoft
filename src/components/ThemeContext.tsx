import React, { createContext, useState, type ReactNode } from "react";
import { themes } from "../themes/themes";

type Theme = typeof themes.light;

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {}
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prev) => (prev === themes.light ? themes.dark : themes.light))
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
