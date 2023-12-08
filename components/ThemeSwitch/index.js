import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import styles from "@/styles/drawer.module.css"; // Replace with the actual path to your styles

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "system" ? "dark" : "system"));
  };

  return (
    <button className={styles.drawerArrow} onClick={toggleTheme}>
      <svg
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
      >
        <circle cx="24" cy="24" r="10" />
      </svg>
    </button>
  );
};

export default ThemeSwitch;
