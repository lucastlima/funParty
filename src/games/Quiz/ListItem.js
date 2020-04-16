import React from "react";
import { StyledNavLink } from "../../style/styledComponents";
import styled from "styled-components";

const StyledListItem = styled.div`
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0.3rem 0 0 rgba(0, 0, 0, 0.3), 0 0 1rem rgba(0, 0, 0, 0.14);
  border-radius: 1rem;
  padding: 0 1rem;
  color: ${({ disable }) => (!disable ? "#d3d3d3" : null)};
  margin-bottom: 0.8rem;
`;

function ListItem({ id, roomName, joinable }, index) {
  return (
    <StyledNavLink key={index} to={joinable ? `quiz/${id}` : "#"}>
      <StyledListItem disable={joinable}>
        <h3>{roomName}</h3>
        <h3>{joinable ? "Join" : "Playing"}</h3>
      </StyledListItem>
    </StyledNavLink>
  );
}

export default ListItem;
