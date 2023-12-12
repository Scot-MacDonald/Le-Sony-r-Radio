// components/Loader.js
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const countAnimation = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const LoaderContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ccc;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: #0070f3;
  animation: ${countAnimation} 2s ease-out;
  transform-origin: left;
`;

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress < 100 ? prevProgress + 1 : 100
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <LoaderContainer>
      <ProgressBar style={{ width: `${progress}%` }} />
    </LoaderContainer>
  );
};

export default Loader;
