import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "light") {
      return <Moon className="h-5 w-5" />;
    } else if (theme === "dark") {
      return <Sun className="h-5 w-5" />;
    } else {
      return <Monitor className="h-5 w-5" />;
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full glass hover:scale-110 transition-all duration-300"
      aria-label="Toggle theme"
      title={`Current theme: ${theme}. Click to cycle through themes.`}
    >
      {getIcon()}
    </button>
  );
}
