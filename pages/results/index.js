// pages/results.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/results.module.css";

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
    <>
      <h1>RESULTS</h1>
      <ul className={styles.featured}>
        {results.map((result) => (
          <li className={styles.row} key={result._id}>
            {result.type === "event" ? (
              <Link href={`/events/${result.slug}`}>
                <p>{result.type}</p>
                <h2>{result.title}</h2>
              </Link>
            ) : (
              <Link href={`/${result.slug}`}>
                <p>{result.type}</p>
                <h2>{result.title}</h2>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Results;
