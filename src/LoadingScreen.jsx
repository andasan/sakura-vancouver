import React from "react";
import styled from "styled-components";

const LoadingScreen = () => {
  return (
    <PreloaderContainer>
      <div className="sakura"></div>
    </PreloaderContainer>
  );
};

const PreloaderContainer = styled.div`
background-color: rgba(0,0,0,.5);
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: 300;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoadingScreen;
