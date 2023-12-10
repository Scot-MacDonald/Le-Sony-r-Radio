import useSWR from "swr";
import Link from "next/link";
import { useSelectedTrack } from "@/context/SelectedTrackContext";
import styles from "@/styles/events.module.css";
import Image from "next/image";

export default function EventList({ events }) {
  console.log("Received Events in EventList:", events);

  if (!events || !Array.isArray(events)) {
    return <h1>No Events available</h1>;
  }

  const dataArray = events;

  console.log("Event Data:", dataArray);

  return (
    <>
      <h1 className={styles.header}>EVENTS</h1>
      <ul className={styles.events}>
        {dataArray.map((event) => (
          <li className={styles.event} key={event.slug}>
            <div className={styles.eventContent}>
              <Link href={`/events/${event.slug}`}>
                <div className={styles.imageContainer}>
                  <Image
                    src={event.imageURL}
                    alt={`Image for ${event.title}`}
                    width={420}
                    height={420}
                  />
                </div>

                <div className={styles.eventHeader}>
                  <div className={styles.eventTitle}>{event.title}</div>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
