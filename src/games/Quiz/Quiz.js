import React from "react";
//import { StyledQuiz } from "../../style/styledComponents";
import Modal from "../../components/Modal";
import JoinGame from "./JoinGame";
import NewGame from "./NewGame";
import RoomsList from "./RoomsList";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../store/actions";
import styled from "styled-components";

const StyledQuiz = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  h1 {
    color: white;
  }

  .container {
    display: flex;
    flex-direction: column;
    flex: 1;
    max-width: 30rem;
    margin: 0 2rem;
    justify-content: center;
    align-items: center;
  }
`;

const StyledQuizMenu = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  padding: 2rem;
  font-size: 1.4rem;

  h4 {
    display: block;
    cursor: pointer;
    transition: transform 0.1s ease-in;

    &:first-of-type {
      margin-right: 0.5rem;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
`;

function Quiz() {
  const dispatch = useDispatch();
  const { quizJoinGame, quizNewGame } = useSelector(({ ui }) => ui.modal);

  const handleJoinGame = () => {
    dispatch(setModal("quizJoinGame"));
  };
  const handleNewGame = () => {
    dispatch(setModal("quizNewGame"));
  };

  return (
    <StyledQuiz>
      <div className="container">
        <div className="header">
          <h1>Quiz!</h1>
        </div>
        <StyledQuizMenu className="ui-wrapper">
          <h4 onClick={handleNewGame}>NEW GAME</h4>

          <h4 onClick={handleJoinGame}>JOIN ROOM</h4>
        </StyledQuizMenu>
        <RoomsList />
      </div>
      {quizJoinGame && (
        <Modal openState={quizJoinGame} handleClose={handleJoinGame}>
          <JoinGame />
        </Modal>
      )}
      {quizNewGame && (
        <Modal openState={quizNewGame} handleClose={handleNewGame}>
          <NewGame />
        </Modal>
      )}
    </StyledQuiz>
  );
}

export default Quiz;
