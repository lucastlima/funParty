import React, { useState, useEffect } from "react";
import { StyledQuiz, UIWrapper } from "../../style/styledComponents";
import Modal from "../../components/Modal";
import JoinGame from "./JoinGame";
import NewGame from "./NewGame";
import { database } from "../../firebase/firebase";

function Quiz() {
  const [joinGameModal, setJoinGameModal] = useState(false);
  const [newGameModal, setnewGameModal] = useState(false);
  const [list, setList] = useState([]);

  const handleJoinGame = () => {
    setJoinGameModal(!joinGameModal);
  };
  const handleNewGame = () => {
    setnewGameModal(!newGameModal);
  };

  useEffect(() => {
    const roomsListRef = database.ref("quiz/sessions");
    roomsListRef.once("value", snap => {
      const dataObj = snap.val();
      setList(Object.values(dataObj));
    });
  }, []);

  console.log(list);

  return (
    <StyledQuiz>
      <h1>Quiz!</h1>
      <UIWrapper margin="2rem">
        <div className="menu">
          <h4 onClick={handleNewGame}>NEW GAME</h4>
          <h4 onClick={handleJoinGame}>JOIN ROOM</h4>
        </div>
      </UIWrapper>
      <UIWrapper padding="2rem">
        <h2>Games</h2>
        {list.map((item, i) => (
          <div key={i}>
            <h1>{item.roomName}</h1>
          </div>
        ))}
      </UIWrapper>
      {joinGameModal && (
        <Modal openState={joinGameModal} handleClose={handleJoinGame}>
          <JoinGame />
        </Modal>
      )}
      {newGameModal && (
        <Modal openState={newGameModal} handleClose={handleNewGame}>
          <NewGame />
        </Modal>
      )}
    </StyledQuiz>
  );
}

export default Quiz;
