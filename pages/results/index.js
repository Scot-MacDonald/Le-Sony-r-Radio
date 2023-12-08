// pages/results.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Results = () => {
  const router = useRouter();
  const { query } = router.query;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setResults(data.results);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      {/* Display search results */}
      {results.map((result) => (
        <div key={result._id}>
          {/* Common information for both Event and Mix */}
          <p>{result.city}</p>
          <Image
            src={result.imageURL}
            alt={`Image for ${result.title}`}
            width={312}
            height={205}
          />

          {/* Render link based on result type */}
          {result.type === "event" ? (
            <Link href={`/events/${result.slug}`}>{result.title}</Link>
          ) : (
            <Link href={`/${result.slug}`}>{result.title}</Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Results;
