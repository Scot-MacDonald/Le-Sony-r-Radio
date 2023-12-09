import Header from "@/components/Header";
import styles from "@/styles";
import Footer from "../Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const RootLayout = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },

            exitState: {},
          }}
          className="base-page-size"
        >
          <main className={styles.main}>{children}</main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default RootLayout;
