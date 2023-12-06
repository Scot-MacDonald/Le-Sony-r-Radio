import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
import styles from "@/styles/drawer.module.css";
import Image from "next/image";

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
                  src=" 
                  https://media2.ntslive.co.uk/resize/1600x1600/e44a2d7d-ad90-43ac-8051-9367c2fc0e4d_1692144000.jpeg"
                  alt="GFG logo served with static path of public directory"
                  height="300"
                  width="500"
                />
              </div>
              <div className={styles.liveChannel__content__details}>
                Music To Ease Your Disease
              </div>
            </div>
            <div className={styles.liveChannel__footer}>foot 1</div>
          </div>
          <div className={`${styles.liveChannel} ${styles.channel2}`}>
            <div className={styles.liveChannel__header}></div>
            <div className={styles.liveChannel__content}>
              <div className={styles.liveChannel__content__image}>
                <Image
                  src=" 
                    https://media2.ntslive.co.uk/resize/1600x1600/1432046c-1f55-49ef-80ff-0bf8a9367501_1684281600.jpeg"
                  alt="GFG logo served with static path of public directory"
                  height="300"
                  width="500"
                />
              </div>
              <div className={styles.liveChannel__content__details}>
                Andrew Weatherall Presents: Music's Not For Everyone
              </div>
            </div>

            <div className={styles.liveChannel__footer}>foot 2</div>
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
