import React, { useEffect } from "react";
import {
  StyledQuiz,
  UIWrapper,
  StyledRoomList
} from "../../style/styledComponents";
import Modal from "../../components/Modal";
import JoinGame from "./JoinGame";
import NewGame from "./NewGame";
import { useDispatch, useSelector } from "react-redux";
import { setModal, initRoomsListener } from "../../store/actions";

function Quiz() {
  const dispatch = useDispatch();
  const { quizJoinGame, quizNewGame } = useSelector(({ ui }) => ui.modal);
  const { roomsList } = useSelector(({ quiz }) => quiz);

  const handleJoinGame = () => {
    dispatch(setModal("quizJoinGame"));
  };
  const handleNewGame = () => {
    dispatch(setModal("quizNewGame"));
  };

  useEffect(() => {
    const roomsListener = dispatch(initRoomsListener());
    return () => roomsListener.off();
  }, [dispatch]);

  useEffect(() => {
    const handleDisconnet = e => {
      console.log(e);
    };
    window.onbeforeunload = handleDisconnet;
  }, []);

  return (
    <StyledQuiz>
      <h1>Quiz!</h1>
      <UIWrapper margin="2rem">
        <div className="menu">
          <h4 onClick={handleNewGame}>NEW GAME</h4>
          <h4 onClick={handleJoinGame}>JOIN ROOM</h4>
        </div>
      </UIWrapper>
      <UIWrapper>
        <StyledRoomList>
          <h2>Active Rooms:</h2>
          {roomsList.map((item, i) => (
            <div key={i}>
              <h2>{item.roomName}</h2>
            </div>
          ))}
        </StyledRoomList>
      </UIWrapper>
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
