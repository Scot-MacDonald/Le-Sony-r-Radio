import styles from "@/styles/LiveHeader.module.css";

export default function LiveHeader() {
  return (
    <>
      <header className={`${styles.header}`}>
        <div className={styles.main}>
          <span className={styles.channel}>1</span>
          <div className={styles.svg}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <div className={styles.name}>Somewhere Travel</div>
          <div className={styles.country}>Berlin</div>
        </div>
        <div className={styles.sidebarfirst}>Live now</div>
        <div className={styles.sidebarsecond}>
          <span className={styles.channel}>2</span>
          <div className={styles.name}>Astral Travelled</div>
          <div className={styles.country}>London</div>
        </div>
      </header>
    </>
  );
}
