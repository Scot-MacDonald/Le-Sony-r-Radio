// LoginForm.js

//////////////////////
import styles from "@/styles/mixForm.module.css";
import React, { useState, useEffect, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginForm() {
  const { data: session } = useSession();
  if (session) {
    return (
      <main className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.fieldset}>
            <form className={styles.form}>
              <h2>Welcome, {session.user.name}</h2>
            </form>
            <button className={styles.button} onClick={() => signOut()}>
              Log Out
            </button>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.fieldset}>
            <form className={styles.form}>
              <h2>You are not logged in!</h2>
            </form>
            <button className={styles.button} onClick={() => signIn("google")}>
              Log in
            </button>
          </div>
        </div>
      </main>
    );
  }
}
/////////////////////////////////////////////////////////////////////////
// return (
//   <main className={styles.container}>
//     <div className={styles.formContainer}>
//       <fieldset className={styles.fieldset}>
//         <legend className={styles.legend}>LOGIN</legend>
//         <form className={styles.form}>
//           <label htmlFor="email"></label>
//           <input
//             className={styles.form}
//             type="text"
//             id="email"
//             name="email"
//             placeholder="EMAIL:"
//           />

//           <label htmlFor="password"></label>
//           <input
//             className={styles.form}
//             type="text"
//             id="password"
//             name="password"
//             placeholder="PASSWORD:"
//           />

//           <button className={styles.button} type="submit">
//             Login
//           </button>
//         </form>
//       </fieldset>
//     </div>
//   </main>
//   );
// }
