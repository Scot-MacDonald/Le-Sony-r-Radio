// MixForm.js
import styles from "@/styles/mixForm.module.css";
import React, { useState, useEffect, useMemo } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginForm() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>you are not signed in</h1>
        <button onClick={() => signIn("google")}>Sign in</button>
      </div>
    );
  }
}

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
