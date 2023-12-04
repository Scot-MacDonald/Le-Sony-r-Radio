import useSWR from "swr";
import Link from "next/link";
import { useSelectedTrack } from "@/context/SelectedTrackContext";
import styles from "@/styles/mixes.module.css";
import Image from "next/image";

export default function EventList({ events }) {
  console.log("Received Events in EventList:", events);

  if (!events || !Array.isArray(events)) {
    return <h1>No Events available</h1>;
  }

  const dataArray = events;

  console.log("Event Data:", dataArray);

  return (
    <ul>
      {dataArray.map((event) => (
        <li className={styles.event} key={event.slug}>
          <div className={styles.eventContent}>
            <div>
              <Image
                src={event.imageURL}
                alt={`Image for ${event.title}`}
                width={312}
                height={205}
              />
            </div>

            <div className={styles.eventHeader}>
              <Link href={`/events/${event.slug}`}>
                <div className={styles.eventTitle}>{event.title}</div>
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
