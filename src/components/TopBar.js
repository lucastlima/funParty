import React from "react";
import styled from "styled-components/macro";
import { userSignOut } from "../store/actions";
import { useDispatch } from "react-redux";
import { StyledNavLink } from "../style/styledComponents";

const StyledTopBar = styled.div`
  display: flex;
  min-height: 4rem;
  width: 100%;
  background-color: white;
  align-items: center;
  padding: 0.5rem 1rem;
  justify-content: space-between;

  #signout {
    cursor: pointer;
  }
`;

function TopBar() {
  const dispatch = useDispatch();
  return (
    <StyledTopBar>
      <StyledNavLink to="/quiz">
        <h2>Home</h2>
      </StyledNavLink>
      <span id="signout" onClick={() => dispatch(userSignOut())}>
        SignOut
      </span>
    </StyledTopBar>
  );
}

export default TopBar;
