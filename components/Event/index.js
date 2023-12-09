// Event.js
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import EventForm from "@/components/EventForm";
import Link from "next/link";
import styles from "@/styles/event.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react"; // Import useSession
import { useSelectedTrack } from "@/context/SelectedTrackContext";

export default function Event() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, mutate } = useSWR(`/api/events/${slug}`);
  const { data: session } = useSession();
  console.log("Session:", session); // Use useSession hook to get the session information

  async function handleEdit(formData) {
    const response = await fetch(`/api/events/${slug}`, {
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
    const response = await fetch(`/api/events/${slug}`, { method: "DELETE" });

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

  return (
    <>
      <section className={styles.eventContainer}>
        <Image
          className={styles.eventImage}
          src={data.imageURL}
          alt={`Image for ${data.title}`}
          width={312}
          height={205}
        />
        <section className={styles.eventProfile}>
          <div>
            {session && ( // Display buttons only if the user is signed in
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
          <div className={styles.bio}>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
          <div className={styles.tracklist}>
            {isEditMode && (
              <EventForm onSubmit={handleEdit} value={data} isEditMode={true} />
            )}
          </div>
          <div className={styles.foot}>
            <Link href="/events" className={styles.bt}>
              Back to all
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
