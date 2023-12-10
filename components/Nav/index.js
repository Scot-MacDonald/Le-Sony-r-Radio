import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "@/styles/nav.module.css";
import NavSearchBar from "@/components/NavSearchBar";
import { useState } from "react";

export default function Nav() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div
        className={`${styles.hamburgerIcon} ${showMenu ? "show" : ""}`}
        onClick={toggleMenu}
      >
        &#9776;
      </div>
      <ul className={`${styles.nav} ${showMenu ? styles.show : ""}`}>
        <li>
          <Link href="/" onClick={toggleMenu}>
            TRANSMIT_RADIO
          </Link>
        </li>
        <li>
          <Link href="/explore" onClick={toggleMenu}>
            EXPLORE
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={toggleMenu}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link href="/events" onClick={toggleMenu}>
            EVENTS
          </Link>
        </li>
        {session ? (
          <li>
            <Link href="/addMix" onClick={toggleMenu}>
              ADD MIX
            </Link>
          </li>
        ) : null}
        {session ? (
          <li>
            <Link href="/addEvent" onClick={toggleMenu}>
              ADD EVENT
            </Link>
          </li>
        ) : null}
        <li>
          <Link href="/login" onClick={toggleMenu}>
            LOGIN
          </Link>
        </li>
        <div className={styles.searchBarContainer}>
          <NavSearchBar />
        </div>
      </ul>
    </>
  );
}
