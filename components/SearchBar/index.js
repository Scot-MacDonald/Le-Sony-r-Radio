// components/SearchBar.js
import { useState } from "react";
import Link from "next/link";
import styles from "@/styles/nav.module.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Navigate to the results page with the search query
    Router.push(`/results?search=${searchQuery}`);
  };

  return (
    <div>
      <input
        className={styles.search}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link href={`/results?search=${searchQuery}`} passHref>
        <button>Search</button>
      </Link>
    </div>
  );
};

export default SearchBar;
