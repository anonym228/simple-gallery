import React from "react";
import MainContent from "./MainContent";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body{
    font-family: Tahoma, Arial;
    margin:0px;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <MainContent />
    </>
  );
};

export default App;
