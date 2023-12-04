import Header from "@/components/Header";
import styles from "@/styles";
import Footer from "../Footer";

const RootLayout = ({ children }) => {
  return (
    <>
      <Header />

      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
