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
          <div className={styles.bio}>
            {/* Play/Stop button */}
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
            <h1 className={styles.bio__title}>{data.title}</h1>
            <h2 className={styles.bio__city}>{data.city}</h2>
            <p>{data.description}</p>
            <p>{data.tags}</p>
          </div>

          <div className={styles.tracklist}>
            <ul>
              <li>Track 1</li>
              <li>Track 2</li>
              <li>Track 2</li>
              <li>Track 2</li>
              <li>Track 1</li>
              <li>Track 2</li>
              <li>Track 2</li>
              <li>Track 2</li>
              <li>Track 1</li>
              <li>Track 2</li>
              <li>Track 2</li>
              <li>Track 2</li>
            </ul>
            <div>
              {session && (
                <div>
                  <button
                    onClick={() => {
                      setIsEditMode(!isEditMode);
                    }}
                  >
                    <span role="img" aria-label="A pencil">
                      Edit Mix
                    </span>
                  </button>
                  <button onClick={handleDelete} disabled={isEditMode}>
                    <span role="img" aria-label="A cross indicating deletion">
                      Delete Mix
                    </span>
                  </button>
                </div>
              )}
            </div>

            {isEditMode && (
              <MixForm onSubmit={handleEdit} value={data} isEditMode={true} />
            )}
            <div className={styles.foot}>
              <Link href="/" className={styles.bt}>
                Back to all
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
