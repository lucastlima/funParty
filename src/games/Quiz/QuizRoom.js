import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../firebase/firebase";
import he from "he";

function QuizRoom() {
  const { id } = useParams();
  const [quizState, setQuizState] = useState({ questions: [] });

  useEffect(() => {
    const currentRoom = database.ref(`/quiz/sessions/${id}`);
    currentRoom.on("value", snap => {
      setQuizState(snap.val());
    });
  }, [id]);
  return (
    <div>
      {quizState.questions.map((q, i) => (
        <h1 key={i}>{he.decode(q.question)}</h1>
      ))}
    </div>
  );
}

export default QuizRoom;
