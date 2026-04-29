"use client";

import { useEffect } from "react";
import { getSettings } from "@/lib/actions";

export default function ThemeProvider() {
  useEffect(() => {
    async function loadTheme() {
      const settings = await getSettings();
      if (settings?.theme === "light") {
        document.documentElement.classList.add("theme-light");
      } else {
        document.documentElement.classList.remove("theme-light");
      }
    }
    loadTheme();
  }, []);

  return null;
}
