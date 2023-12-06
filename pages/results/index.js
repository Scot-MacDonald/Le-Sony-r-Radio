// pages/results.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/results.module.css";

const Results = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [mixes, setMixes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the search query from the URL
    const { search } = router.query;
    setSearchQuery(search || "");

    // Fetch search results based on the search query
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/mixes?search=${search}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch results. Status: ${response.status}`
          );
        }

        const resultMixes = await response.json();
        console.log("Fetched mixes:", resultMixes);
        setMixes(resultMixes);
      } catch (error) {
        console.error("Error fetching results:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchResults();
    }
  }, [router.query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      {mixes.length > 0 ? (
        <ul>
          {mixes.map((mix) => (
            <li className={styles.item} key={mix._id}>
              <Link href={`/${mix.slug}`}>{mix.title}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No mixes found</p>
      )}
    </div>
  );
};

export default Results;
