import React from "react";
import styled from "styled-components/macro";
import TopBar from "./TopBar";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
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
