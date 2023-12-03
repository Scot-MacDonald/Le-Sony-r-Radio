import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";
import MixForm from "@/components/MixForm/index";
import Link from "next/link";
import styles from "@/styles/mix.module.css";
import Image from "next/image";

export default function Mix() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/mixes/${slug}`);

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
      setIsEditMode(false); // Exit edit mode after successful update
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
            <h1>{data.title}</h1>
            <p>{data.country}</p>
            <p>{data.date}</p>
            <p>{data.description}</p>
            <p>{data.tags}</p>
          </div>
          <div className={styles.tracklist}>
            <ul>
              <li>Track 1</li>
              <li>Track 2</li>
              <li>Track 2</li>
              <li>Track 2</li>
            </ul>
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

            {isEditMode && (
              <MixForm onSubmit={handleEdit} value={data} isEditMode={true} />
            )}

            <Link href="/" className={styles.bt}>
              Back to all
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
