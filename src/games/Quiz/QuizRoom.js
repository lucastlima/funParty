import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import he from "he";
import styled from "styled-components/macro";
import { setQuizCurrentSession } from "../../store/actions";
import Chat from "./Chat";

const StyledQuizRoom = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;
`;

const StyledPlayers = styled.div`
  display: flex;
  flex: 1;
  padding: 1rem 2rem;
`;

const StyledStageWrapper = styled.div`
  display: flex;
  flex: 8;
  flex-wrap: wrap;
`;

const StyledContent = styled.div`
  display: flex;
  flex: 1;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
`;

const StyledQuizStage = styled.div`
  display: flex;
  flex: 6 40rem;
  padding: 2rem;
  overflow: hidden;
`;

const StyledPlayerAvatar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 0.5rem;
  #avatar {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background-color: #dedede;
  }
`;

function QuizRoom() {
  const dispatch = useDispatch();
  const { currentSession } = useSelector(({ quiz }) => quiz);
  const { id } = useParams();

  useEffect(() => {
    dispatch(setQuizCurrentSession(id));
  }, [id, dispatch]);

  if (!currentSession) return <h1>Loading...</h1>;

  const { questions, counter, players } = currentSession;

  return currentSession ? (
    <StyledQuizRoom>
      <StyledPlayers className="ui-wrapper">
        {Object.values(players).map(player => (
          <StyledPlayerAvatar key={player.uid}>
            <div id="avatar"></div>
            <span>{`${player.firstName} ${player.lastName}`}</span>
          </StyledPlayerAvatar>
        ))}
      </StyledPlayers>
      <StyledStageWrapper>
        <Chat />
        <StyledQuizStage className="ui-wrapper">
          <StyledContent>
            <h1>{he.decode(questions[counter].question)}</h1>
          </StyledContent>
        </StyledQuizStage>
      </StyledStageWrapper>
    </StyledQuizRoom>
  ) : null;
}

export default QuizRoom;
