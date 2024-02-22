"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import styles from "@/styles/drawer.module.css";
import Image from "next/image";
import ThemeSwitch from "../ThemeSwitch";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <>
        <div className={styles.liveHeader}>
          <div className={styles.liveChannel}>
            <div className={styles.liveChannel__header}></div>
            <div className={styles.liveChannel__content}>
              <div className={styles.liveChannel__content__image}>
                <Image
                  src="https://media2.ntslive.co.uk/resize/1600x1600/5e01c82a-a51b-44b8-b91f-ee0bad6c2c3e_1695686400.jpeg"
                  alt="GFG logo served with static path of public directory"
                  width={500}
                  height={280}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "280px",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div className={styles.liveChannel__content__details}>
                <p>12.12.2023</p>
                <h4>Spa-Time W/ Tim Hecker</h4>
                <p>
                  Tim Hecker plays his favorites new and old. Shows will be
                  themed and may include some guests.{" "}
                </p>
              </div>
            </div>
            <div className={styles.liveChannel__footer}>
              <div className={styles.liveChannel__footer__label}>NEXT ON 1</div>
              <div className={styles.liveChannel__footer__details}>
                Rockers Delight w/ Exotic Gardens
              </div>
            </div>
          </div>
          <div className={`${styles.liveChannel} ${styles.channel2}`}>
            <div className={styles.liveChannel__header}></div>
            <div className={styles.liveChannel__content}>
              <div className={styles.liveChannel__content__image}>
                <Image
                  src="https://media2.ntslive.co.uk/resize/1600x1600/1432046c-1f55-49ef-80ff-0bf8a9367501_1684281600.jpeg"
                  alt="GFG logo served with static path of public directory"
                  width={500}
                  height={280}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "280px",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </div>
              <div className={styles.liveChannel__content__details}>
                <p>12.12.2023</p>
                <h4>Lamin Fofana</h4>
                <p>
                  Lamin Fofana is an artist and musician currently located in
                  New York. His latest releases include Unsettling Scores and
                  The Open Boat.{" "}
                </p>
              </div>
            </div>

            <div className={styles.liveChannel__footer}>
              {" "}
              <div className={styles.liveChannel__footer__label}>NEXT ON 2</div>
              <div className={styles.liveChannel__footer__details}>
                Andrew Weatherall Presents: Music's Not For Everyone
              </div>
            </div>
          </div>
        </div>
      </>
    </Box>
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          className={styles.drawerArrow}
          onClick={toggleDrawer("top", !state.top)}
        >
          <svg
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            style={{
              transition: "transform 0.3s",
              transform: state.top ? "rotate(180deg)" : "rotate(0)",
            }}
          >
            <path d="M14 20l10 10 10-10z" />
            <path d="M0 0h48v48h-48z" fill="none" />
          </svg>
        </Button>
        <ThemeSwitch />
      </div>
      <Drawer
        anchor="top"
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
      >
        {list("top")}
      </Drawer>
    </div>
  );
}
