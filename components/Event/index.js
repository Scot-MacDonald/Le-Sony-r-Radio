// Mix.js
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import EventForm from "@/components/EventList";
import Link from "next/link";
import styles from "@/styles/mix.module.css";
import Image from "next/image";
import { useSelectedTrack } from "@/context/SelectedTrackContext";

export default function Event() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const { data, isLoading, mutate } = useSWR(`/api/events/${slug}`);

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
      <Image
        src={data.imageURL}
        alt={`Image for ${data.title}`}
        width={312}
        height={205}
      />

      <h1>{data.title}</h1>

      <p>{data.description}</p>

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

      {isEditMode && (
        <EventForm onSubmit={handleEdit} value={data} isEditMode={true} />
      )}
      <div className={styles.foot}>
        <Link href="/events" className={styles.bt}>
          Back to all
        </Link>
      </div>
    </>
  );
}
