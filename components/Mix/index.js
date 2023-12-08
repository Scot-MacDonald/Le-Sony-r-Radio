// Mix.js
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import MixForm from "@/components/MixForm/index";
import Link from "next/link";
import styles from "@/styles/mix.module.css";
import Image from "next/image";
import { useSelectedTrack } from "@/context/SelectedTrackContext";

export default function Mix() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, mutate } = useSWR(`/api/mixes/${slug}`);
  const { setSelectedTrack, selectedTrack } = useSelectedTrack();
  const { data: session } = useSession();

  async function handleEdit(formData) {
    const response = await fetch(`/api/mixes/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      mutate();
      setIsEditMode(false);
    }
  }

  async function handleDelete() {
    const response = await fetch(`/api/mixes/${slug}`, { method: "DELETE" });

    if (!response.ok) {
      console.log(response.status);
      return;
    }

    router.push("/");
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) return null;

  const handlePlayClick = () => {
    const isSameTrack = data.url === selectedTrack;

    // If the clicked track is the same as the currently selected track, pause it
    setSelectedTrack(isSameTrack ? null : data.url);
  };

  // components/Mix/index.js
  const renderTags = (tags) => {
    if (!tags || !Array.isArray(tags)) {
      return null; // or return some default value, depending on your requirements
    }

    return (
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <section className={styles.mixContainer}>
        <Image
          className={styles.profileImage}
          src={data.imageURL}
          alt={`Image for ${data.title}`}
          width={312}
          height={205}
        />

        <section className={styles.mixProfile}>
          <div>
            {session && (
              <div>
                <button
                  className={styles.bt}
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                  }}
                >
                  <span role="img" aria-label="A pencil">
                    Edit Mix
                  </span>
                </button>
                <button
                  className={styles.bt}
                  onClick={handleDelete}
                  disabled={isEditMode}
                >
                  <span role="img" aria-label="A cross indicating deletion">
                    Delete Mix
                  </span>
                </button>
              </div>
            )}
          </div>
          <div className={styles.bioHead}>
            <div
              className={`${styles.playButton} ${
                selectedTrack === data.url ? styles.active : ""
              }`}
              onClick={handlePlayClick}
            >
              {selectedTrack === data.url ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="black"
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
                  fill="black"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </div>
            <div className={styles.bioInfos}>
              <h1 className={styles.bio__title}>{data.title}</h1>
              <h2 className={styles.bio__city}>{data.city}</h2>
            </div>
          </div>
          <div className={styles.bio}>
            <div className={styles.border}>
              <p>{data.description}</p>
              {renderTags(data.tags)}
            </div>
          </div>

          <div className={styles.tracklist}>
            <ul>
              <li>Harmony 400, Crescent</li>
              <li>zonin dj, untitled - interview mix</li>
              <li>Hermann And Klein, A Day In A Park</li>
              <li>E-Plume, Kiki’s Gambert</li>
              <li>Brindle Spork, Wild Why (Edit)</li>
              <li>Solvent (ISAN mix), Hergly Bergly (Less Mad Andy Mix)</li>
              <li>Phonem, Un Barrage Contre Le Pacifique</li>
              <li>Sunwoods, Something Wonderful</li>
              <li>Stendec, Arvo</li>
              <li>Languis, Stop Action</li>
              <li>Roland P. Young, Velvet</li>
              <li>Crawling With Tarts, Miner's Wash</li>
              <li>Blu Cocteau, Lo Hex</li>
            </ul>

            {isEditMode && (
              <MixForm onSubmit={handleEdit} value={data} isEditMode={true} />
            )}
          </div>
          <div className={styles.foot}>
            <Link href="/" className={styles.bt}>
              Back to all
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
