
import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = createContext();

export function CustomThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  useEffect(() => {
  const root = document.documentElement;

  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}, [mode]);


  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: { main: "rgba(61, 62, 100, 1)" }, //"rgba(52, 105, 184, 1)", "#03575c", "rgba(61, 62, 100, 1)",
                background: {
                  default: "#ffffff",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#111",
                },
              }
            : {
                primary: { main: "#87ced2" },
                background: {
                  default: "#1d1d1d",
                  paper: "#01010cff",
                  
                  
                },
                text: {
                  primary: "#fff",
                },
              }),
        },
        // more components
         typography: {
          fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
          h1: { fontWeight: 700 },
          h2: { fontWeight: 600 },
          h3: { fontWeight: 600 },
          body1: { fontSize: "1rem" },
        }, 
        //end
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);

/* // ThemeProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme2, setTheme] = useState("light");

  const toggleTheme = () => {
    const next = theme2 === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
  };

  // lade gespeichertes Theme
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);

  // aktualisiere HTML-Klasse
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme2 === "dark");
  }, [theme2]);

  return (
    <ThemeContext.Provider value={{ theme2, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme2 = () => useContext(ThemeContext);
 */