import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "@/styles/nav.module.css";

export default function Nav() {
  const { data: session } = useSession();

  return (
    <>
      <ul className={styles.nav}>
        <li>
          <Link href="/">LATEST</Link>
        </li>
        <li>
          <Link href="/explore">EXPLORE</Link>
        </li>
        <li>
          <Link href="/about">ABOUT</Link>
        </li>
        <li>
          <Link href="/events">EVENTS</Link>
        </li>
        {session ? (
          <li>
            <Link href="/addMix">ADD MIX</Link>
          </li>
        ) : null}
        <li>
          <Link href="/login">LOGIN</Link>
        </li>
        <input
          className={styles.search}
          type="search"
          placeholder="Search..."
        />
      </ul>
    </>
  );
}
