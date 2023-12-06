// pages/index.js (or any other page)
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

const Home = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Display search results */}
      {results.map((result) => (
        <div key={result._id}>
          <p>{result.title}</p>
          {/* Display other relevant information based on the result type (Event or Mix) */}
        </div>
      ))}
    </div>
  );
};

export default Home;

// // pages/results.js
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import styles from "@/styles/results.module.css";

// const Results = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [mixes, setMixes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Get the search query from the URL
//     const { search } = router.query;
//     setSearchQuery(search || "");

//     // Fetch search results based on the search query
//     const fetchResults = async () => {
//       try {

//         const response = await fetch(`/api/mixes?search=${search}`);
//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch results. Status: ${response.status}`
//           );
//         }

//         const resultMixes = await response.json();
//         console.log("Fetched mixes:", resultMixes);
//         setMixes(resultMixes);
//       } catch (error) {
//         console.error("Error fetching results:", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (search) {
//       fetchResults();
//     }
//   }, [router.query]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Search Results for "{searchQuery}"</h1>
//       {mixes.length > 0 ? (
//         <ul>
//           {mixes.map((mix) => (
//             <li className={styles.item} key={mix._id}>
//               <Link href={`/${mix.slug}`}>{mix.title}</Link>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No mixes found</p>
//       )}
//     </div>
//   );
// };

// export default Results;
