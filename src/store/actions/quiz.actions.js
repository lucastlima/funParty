import { database } from "../../firebase/firebase";
import axios from "axios";
import _ from "lodash";
import he from "he";
import { SET_QUIZ_ROOMS_LIST, SET_QUIZ_CURRENT_SESSION } from "../actionTypes";

const setLocalStorage = (state) => {
  localStorage.setItem("funParty", JSON.stringify(state));
};

export const initQuizSession = (config) => async (dispatch, getState) => {
  try {
    console.log(config);
    const user = getState().auth.userAuth;
    const { amount, type, id, roomName } = config;
    const req = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount,
        type,
      },
    });
    const questions = await req.data.results;
    questions.forEach((q) => {
      q.answers = [...q.incorrect_answers, q.correct_answer].sort((a, b) =>
        a > b ? 1 : -1
      );
    });

    if (questions.length) {
      const sessions = database.ref(`quiz/sessions/${id}`);
      await sessions.set({
        questions,
        counter: 0,
        private: false,
        joinable: true,
        id,
        roomName,
        quizMaster: user.uid,
        chat: {},
        players: {},
        maxPlayers: 25,
      });
    } else {
      console.log("Error loading questions.", questions);
    }
  } catch (error) {
    console.log(error);
  }
};

export const initRoomsListener = () => (dispatch, getState) => {
  const roomsListRef = database.ref("quiz/sessions");
  roomsListRef.on("value", (snap) => {
    if (snap.val()) {
      dispatch({
        type: SET_QUIZ_ROOMS_LIST,
        list: Object.values(snap.val()),
      });
    }
  });
  return roomsListRef;
};

export const setQuizCurrentSession = (id) => async (dispatch, getState) => {
  const currentRoom = database.ref(`/quiz/sessions/${id}`);
  const roomsList = getState().quiz.roomsList;

  currentRoom.on("value", (snap) => {
    if (snap.val()) {
      dispatch({
        type: SET_QUIZ_CURRENT_SESSION,
        session: snap.val(),
      });
      setLocalStorage(getState());
    } else {
      dispatch({
        type: SET_QUIZ_CURRENT_SESSION,
        session: null,
      });
      dispatch({
        type: SET_QUIZ_ROOMS_LIST,
        list: roomsList.filter((r) => r.id !== id),
      });
      setLocalStorage(getState());
    }
  });
};

export const joinQuizRoom = (roomId) => async (dispatch, getState) => {
  const player = getState().auth.userAuth;
  const playerRef = database.ref(
    `/quiz/sessions/${roomId}/players/${player.uid}`
  );
  playerRef.once("value", (snap) => {
    if (!snap.val()) {
      playerRef.set(player);
    }
  });
};

export const leaveQuizRoom = (roomId) => async (dispatch, getState) => {
  const userId = getState().auth.userAuth.uid;
  const currentSession = getState().quiz.currentSession;
  const players = Object.values(currentSession.players);

  if (userId === currentSession.quizMaster && players.length > 1) {
    const remainingPlayers = players.filter((p) => p.uid !== userId);
    console.log(remainingPlayers);
    const updates = {};
    updates[`/quiz/sessions/${roomId}/quizMaster`] =
      remainingPlayers[_.random(0, remainingPlayers.length - 1)].uid;
    await database.ref().update(updates);
    await database.ref(`/quiz/sessions/${roomId}/players/${userId}`).remove();
  } else if (userId === currentSession.quizMaster && players.length <= 1) {
    await database.ref(`/quiz/sessions/${roomId}`).remove();
  } else {
    await database.ref(`/quiz/sessions/${roomId}/players/${userId}`).remove();
  }
};

export const sendMessage = (id, message) => async (dispatch, getState) => {
  const updates = {};
  updates[`/quiz/sessions/${id}/chat/${message.msgId}`] = message;
  await database.ref().update(updates);
};

export const submitAnswer = (playerAnswer) => async (dispatch, getState) => {
  const { questions } = getState().quiz.currentSession;
  const { questionNumber, roomId, userId, answer } = playerAnswer;
  const currentCorrectAnswer = he.decode(
    questions[questionNumber].correct_answer
  );

  await database
    .ref(`quiz/sessions/${roomId}/answers/${questionNumber}/${userId}`)
    .set(playerAnswer);
  const playerScoreRef = database.ref(
    `quiz/sessions/${roomId}/score/${userId}`
  );

  playerScoreRef.once("value", (snap) => {
    if (snap.val()) {
      if (answer === currentCorrectAnswer) {
        playerScoreRef.update({ points: snap.val().points + 200 });
      }
    } else {
      if (answer === currentCorrectAnswer) {
        playerScoreRef.set({ points: 200 });
      } else {
        playerScoreRef.set({ points: 0 });
      }
    }
  });
};

export const nextQuestion = () => async (dispatch, getState) => {
  const { counter, id, questions } = getState().quiz.currentSession;
  if (counter < questions.length - 1) {
    const updates = {};
    updates[`quiz/sessions/${id}/counter`] = counter + 1;
    await database.ref().update(updates);
  }
};
