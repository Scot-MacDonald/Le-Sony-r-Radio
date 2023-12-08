// MixList.js
import useSWR from "swr";
import Link from "next/link";
import { useSelectedTrack } from "@/context/SelectedTrackContext";
import styles from "@/styles/mixes.module.css";
import Image from "next/image";

export default function MixList({ mixes, onTagClick, onPlayClick }) {
  const {
    selectedTrack,
    setSelectedTrack,
    selectedTags = [],
  } = useSelectedTrack();

  if (!mixes || !Array.isArray(mixes)) {
    return <h1>No mixes available</h1>;
  }

  const sortedMixes = mixes
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredMixes = sortedMixes.filter((mix) =>
    selectedTags.every((tag) => mix.tags.includes(tag))
  );

  return (
    <>
      <h2 className={styles.header}>MIXES</h2>
      <ul className={styles.mixes}>
        {filteredMixes.map((mix) => (
          <li className={styles.mix} key={mix.slug}>
            <div className={styles.mixContent}>
              <div className={styles.imageContainer}>
                <Image
                  src={mix.imageURL}
                  alt={`Image for ${mix.title}`}
                  width={312}
                  height={205}
                  className={`${styles.mixImage} ${
                    selectedTrack === mix.url ? styles.active : ""
                  }`}
                />
                <div
                  className={`${styles.playButton} ${
                    selectedTrack === mix.url ? styles.active : ""
                  }`}
                  onClick={() => onPlayClick(mix.url)}
                  onMouseEnter={() => {
                    document
                      .querySelector(`.${styles.playButton}`)
                      .classList.add(styles.active);
                  }}
                  onMouseLeave={() => {
                    if (selectedTrack !== mix.url) {
                      document
                        .querySelector(`.${styles.playButton}`)
                        .classList.remove(styles.active);
                    }
                  }}
                >
                  {selectedTrack === mix.url ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="4" width="16" height="16" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </div>
              </div>

              <div className={styles.mixHeader}>
                <Link href={`/${mix.slug}`}>
                  <div className={styles.mixDate}>
                    <div>{new Date(mix.date).toLocaleDateString()}</div>
                    <div>{mix.city}</div>
                  </div>
                  <div className={styles.mixTitle}>{mix.title}</div>
                </Link>
              </div>

              <div className={styles.mixTags}>
                {mix.tags
                  .flatMap((tagItem) => tagItem.split(","))
                  .map((tag, index) => (
                    <span
                      className={styles.mixTag}
                      key={index}
                      onClick={() => onTagClick(tag.trim())}
                    >
                      {tag.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
