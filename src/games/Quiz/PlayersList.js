import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledPlayers = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem 2rem;
`;

const StyledPlayerAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  #avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #dedede;
  }
`;

function PlayersList() {
  const { players, quizMaster } = useSelector(
    ({ quiz }) => quiz.currentSession
  );
  return players ? (
    <StyledPlayers className="ui-wrapper">
      {Object.values(players).map(player => (
        <StyledPlayerAvatar key={player.uid}>
          <div
            id="avatar"
            style={
              player.uid === quizMaster ? { border: "2px solid gold" } : {}
            }
          ></div>
          <span>{`${player.firstName} ${player.lastName}`}</span>
        </StyledPlayerAvatar>
      ))}
    </StyledPlayers>
  ) : (
    <div>
      <h3>Loading...</h3>
    </div>
  );
}

export default PlayersList;
