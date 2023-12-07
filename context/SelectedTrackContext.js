// // context/SelectedTrackContext.js
// import { createContext, useContext, useState } from "react";

// const SelectedTrackContext = createContext();

// export const SelectedTrackProvider = ({ children }) => {
//   const [selectedTrack, setSelectedTrack] = useState(null);

//   return (
//     <SelectedTrackContext.Provider value={{ selectedTrack, setSelectedTrack }}>
//       {children}
//     </SelectedTrackContext.Provider>
//   );
// };

// export const useSelectedTrack = () => {
//   const context = useContext(SelectedTrackContext);
//   if (!context) {
//     throw new Error(
//       "useSelectedTrack must be used within a SelectedTrackProvider"
//     );
//   }
//   return context;
// };

// SelectedTrackContext.js or your context file
// SelectedTrackContext.js or your context file
import React, { createContext, useContext, useState } from "react";

const SelectedTrackContext = createContext();

export const SelectedTrackProvider = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const onPlayClick = (trackUrl) => {
    // If the clicked track is the same as the currently selected track, pause it
    const isSameTrack = trackUrl === selectedTrack;
    setSelectedTrack(isSameTrack ? null : trackUrl);
  };

  return (
    <SelectedTrackContext.Provider
      value={{ selectedTrack, setSelectedTrack, onPlayClick }}
    >
      {children}
    </SelectedTrackContext.Provider>
  );
};

export const useSelectedTrack = () => {
  return useContext(SelectedTrackContext);
};
