import React from "react";
import styled from "styled-components";
import Sidebar from "./components/sidebar/personaldets";
import Main from "./components/main/main";

const Container = styled.div
    `
      background-color:#eee;
      
      max-height: 100vh;
      @media (max-width: 640px) {
        background-image:none;
      }
      margin: 1em 20em 0em 20em;
      
    `;
  
  const Wrapper = styled.div
     `
      min-height: 98vh;
      max-width: 100vw;
      box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
      @media (max-width: 640px) {
        min-height: 100vh;
      }
      display:flex;
      flex-direction: row;
    `;    
  
  
  function App() {
    return (
      <Container>
        <Wrapper>
        <Sidebar/>
        <Main/>
        </Wrapper>
      </Container>
    );
  }
  
  
  export default App;
