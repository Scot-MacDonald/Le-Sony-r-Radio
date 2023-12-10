// Explore.js
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import MixList from "@/components/MixList";
import styles from "@/styles/explore.module.css";
import { useTagStore, clearSelectedTags } from "@/store/tagStore";
import { useSelectedTrack } from "@/context/SelectedTrackContext";

const Explore = () => {
  const { selectedTags, setSelectedTags, addSelectedTag, removeSelectedTag } =
    useTagStore();
  const { data: allMixes, error } = useSWR("/api/mixes");
  const router = useRouter();
  const { onPlayClick } = useSelectedTrack(); // Get the onPlayClick function from the context

  useEffect(() => {
    // Clear selected tags when leaving the page
    return () => {
      clearSelectedTags();
    };
  }, []);

  useEffect(() => {
    // Check if there are tags in the query parameters
    const { tags } = router.query;
    if (tags && typeof tags === "string") {
      // Set the selected tags based on the query parameters
      const tagsArray = tags.split(",");
      setSelectedTags(tagsArray);
    }
  }, [router.query]);

  const filteredMixes = allMixes
    ? allMixes.filter((mix) =>
        selectedTags.every((tag) => mix.tags.includes(tag))
      )
    : [];

  useEffect(() => {
    console.log("Selected Tags in Explore:", selectedTags);
    console.log("All Mixes in Explore:", allMixes);
    console.log("Filtered Mixes in Explore:", filteredMixes);
  }, [selectedTags, allMixes, filteredMixes]);

  if (error) return <div>Error loading mixes</div>;
  if (!allMixes || !Array.isArray(allMixes)) return <div>Loading mixes...</div>;

  const allTags = Array.from(
    new Set(allMixes.reduce((acc, mix) => [...acc, ...(mix.tags || [])], []))
  );
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

  const handleFilteredTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      // Add the clicked tag to the selected tags
      addSelectedTag(tag);
      // Trigger re-fetch when tags change
      mutate("/api/mixes");
      // Update the URL
      updateURL([...selectedTags, tag]);
    }
  };

  return (
    <section className={styles.explore}>
      <h1>EXPLORE</h1>
      <ul className={styles.explore__selectionBar}>
        {selectedTags.map((item, index) => (
          <li className={styles.explore__tags} key={index}>
            {item}{" "}
            <button
              className={styles.explore__bt}
              onClick={() => {
                removeSelectedTag(item);
                mutate("/api/mixes");
                updateURL(selectedTags.filter((tag) => tag !== item));
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>

      <h2>GENRES</h2>
      <ul className={styles.explore__select}>
        {sortedAllTags.map((tag) => (
          <li className={styles.explore__tags} key={tag}>
            <button
              className={styles.button}
              onClick={() => {
                if (!selectedTags.includes(tag)) {
                  addSelectedTag(tag);
                  mutate("/api/mixes");
                  updateURL([...selectedTags, tag]);
                }
              }}
            >
              {tag}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.explore_select}>
        <MixList
          mixes={filteredMixes}
          onTagClick={handleFilteredTagClick}
          onPlayClick={onPlayClick}
        />
      </div>
    </section>
  );
};

export default Explore;
