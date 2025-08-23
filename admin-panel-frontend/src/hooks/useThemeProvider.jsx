import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContextDef";

export const useThemeProvider = () => useContext(ThemeContext);