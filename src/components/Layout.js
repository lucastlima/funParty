import React from "react";
import styled from "styled-components";
import TopBar from "./TopBar";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
`;

function Layout({ children }) {
  return (
    <StyledApp>
      <TopBar />
      <ContentWrapper>{children}</ContentWrapper>
    </StyledApp>
  );
}

export default Layout;
