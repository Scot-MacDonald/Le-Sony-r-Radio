// components/SearchBar.js
import { useState } from "react";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "@/styles/nav.module.css";
import { useRouter } from "next/router"; // Import useRouter

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter(); // Use useRouter to get the router instance
  const handleSearch = () => {
    // Navigate to the results page with the search query
    router.push(`/results?search=${searchQuery}`);
  };
  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button onClick={handleClear} className={styles.clearButton}>
            <ClearIcon style={{ color: "white" }} />
          </button>
        )}
        <Link href={`/results?search=${searchQuery}`} passHref>
          <button onClick={handleSearch}>
            <SearchIcon style={{ color: "white" }} />
          </button>
        </Link>
      </div>
    </div>
  );
}
