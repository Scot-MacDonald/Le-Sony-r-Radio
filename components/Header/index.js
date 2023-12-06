import styles from "@/styles/header.module.css";
import Nav from "@/components/Nav";
import LiveHeader from "../LiveHeader";
import SearchBar from "../SearchBar";
import Demo from "@/components/Demo";

export default function Header() {
  return (
    <>
      <header className={`${styles.header}`}>
        <Nav />
        <LiveHeader />
        <Demo />
      </header>
    </>
  );
}
