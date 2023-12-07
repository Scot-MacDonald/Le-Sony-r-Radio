// components/NavSearchBar.js
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/nav.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const NavSearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/results?query=${query}`);
  };

  return (
    <div>
      <div className={styles.searchBarContainer}>
        <div className={styles.search}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSearch}>
            <SearchIcon style={{ color: "white" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavSearchBar;
