import styles from "@/styles/about.module.css";

export default function AboutPage() {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.formContainer}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>
              <h2>ABOUT</h2>
            </legend>

            <form className={styles.form}>
              <h3>
                Welcome to Transmxit Radio, where scientists, authors, and
                climate activists collaborate with musicians and DJs to create
                unique mixes. Our station weaves together spoken word and music,
                producing captivating soundscapes that are part essay, part
                melody. Join us for an innovative blend of knowledge and
                artistry, where each mix is a journey that transcends
                traditional boundaries. Transit Radio—where ideas collide, and
                creativity knows no bounds.
              </h3>
            </form>
          </fieldset>
        </div>
      </main>
    </>
  );
}
