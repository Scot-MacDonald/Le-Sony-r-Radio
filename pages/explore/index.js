import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import the useRouter hook
import useSWR, { mutate } from "swr";
import MixList from "@/components/MixList";
import styles from "@/styles/explore.module.css";
import { useTagStore } from "@/store/store";

export default function Explore() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { data: allMixes, error } = useSWR("/api/mixes");
  const router = useRouter(); // Initialize the useRouter hook

  // Add any necessary logic inside the useEffect hook
  useEffect(() => {
    // Your side effect logic here, if needed
  }, [allMixes]);

  // Initialize filteredMixes using useMemo
  const filteredMixes = useMemo(() => {
    return allMixes
      ? allMixes.filter((mix) =>
          selectedItems.every((tag) => mix.tags.includes(tag))
        )
      : [];
  }, [allMixes, selectedItems]);

  // Add the following useEffect for logging
  useEffect(() => {
    console.log("Selected Tags in Explore:", selectedItems);
    console.log("All Mixes in Explore:", allMixes);
    console.log("Filtered Mixes in Explore:", filteredMixes);
  }, [selectedItems, allMixes, filteredMixes]);

  if (error) return <div>Error loading mixes</div>;
  if (!allMixes || !Array.isArray(allMixes)) return <div>Loading mixes...</div>;

  // Extract all unique tags from all mixes
  const allTags = Array.from(
    new Set(allMixes.reduce((acc, mix) => [...acc, ...(mix.tags || [])], []))
  );

  // Function to update the URL when tags change
  const updateURL = (tags) => {
    const queryString = tags.length > 0 ? `?tags=${tags.join(",")}` : "";
    router.push(
      {
        pathname: "/explore",
        query: { tags: tags.join(",") },
      },
      undefined,
      { shallow: true }
    );
  };
  const sortedAllTags = allTags.sort();

  return (
    <div>
      <h2 className={styles.header}>EXPLORE</h2>
      <ul className={styles.selectionBar}>
        {selectedItems.map((item, index) => (
          <li className={styles.tags} key={index}>
            {item}{" "}
            <button
              className={styles.xBt}
              onClick={() => {
                const updatedItems = selectedItems.filter(
                  (prevItem) => prevItem !== item
                );
                setSelectedItems(updatedItems);
                mutate("/api/mixes"); // Trigger re-fetch when tags change
                updateURL(updatedItems); // Update the URL
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <h2>GENRES</h2>
      <ul className={styles.select}>
        {sortedAllTags.map((tag) => (
          <li className={styles.tags} key={tag}>
            <button
              className={styles.button}
              onClick={() => {
                if (!selectedItems.includes(tag)) {
                  const updatedItems = [...selectedItems, tag];
                  setSelectedItems(updatedItems);
                  mutate("/api/mixes");
                  updateURL(updatedItems);
                }
              }}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.explore_select}>
        <MixList mixes={filteredMixes} />
      </div>
    </div>
  );
}
