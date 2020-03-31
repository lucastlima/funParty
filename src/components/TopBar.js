import React from "react";
import styled from "styled-components";
import { userSignOut } from "../store/actions";
import { useDispatch } from "react-redux";

const StyledTopBar = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
  background-color: white;
  align-items: center;
  padding: 0.5rem 1rem;
  justify-content: flex-end;

  #signout {
    cursor: pointer;
  }
`;

function TopBar() {
  const dispatch = useDispatch();
  return (
    <StyledTopBar>
      <span id="signout" onClick={() => dispatch(userSignOut())}>
        SignOut
      </span>
    </StyledTopBar>
  );
}

export default TopBar;
