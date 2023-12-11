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
// SelectedTrackContext.js

import React, { createContext, useContext, useState } from "react";

const SelectedTrackContext = createContext();

export const SelectedTrackProvider = ({ children }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlayButtonClicked, setIsPlayButtonClicked] = useState(false);

  const onPlayClick = (trackUrl) => {
    const isSameTrack = trackUrl === selectedTrack;
    setSelectedTrack(isSameTrack ? null : trackUrl);
    setIsPlayButtonClicked(true);
  };

  return (
    <SelectedTrackContext.Provider
      value={{
        selectedTrack,
        setSelectedTrack,
        onPlayClick,
        isPlayButtonClicked,
      }}
    >
      {children}
    </SelectedTrackContext.Provider>
  );
};

export const useSelectedTrack = () => {
  return useContext(SelectedTrackContext);
};
