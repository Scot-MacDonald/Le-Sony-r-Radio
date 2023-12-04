// pages/search.js

import { useState } from "react";
import { search } from "@/db/connect";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const searchResults = await search(query);
      setResults(searchResults);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((result) => (
          <li key={result._id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
