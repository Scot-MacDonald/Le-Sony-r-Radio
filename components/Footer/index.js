import { useSelectedTrack } from "@/context/SelectedTrackContext";
import styles from "@/styles/footer.module.css";

export default function Footer() {
  const { selectedTrack } = useSelectedTrack();

  return (
    <footer className={styles.footerSC}>
      {selectedTrack && (
        <iframe
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
            selectedTrack
          )}&auto_play=true&show_comments=false&color=72a383 `}
        ></iframe>
      )}
    </footer>
  );
}
