import styles from "@/styles/header.module.css";
import Nav from "@/components/Nav";
import LiveHeader from "../LiveHeader";
import SearchBar from "../SearchBar";

export default function Header() {
  return (
    <>
      <header className={`${styles.header}`}>
        <Nav />
        <LiveHeader />
      </header>
    </>
  );
}
