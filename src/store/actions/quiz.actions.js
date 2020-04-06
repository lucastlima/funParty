import { database } from "../../firebase/firebase";
import axios from "axios";
import { SET_QUIZ_ROOMS_LIST, SET_QUIZ_CURRENT_SESSION } from "../actionTypes";

const setLocalStorage = state => {
  localStorage.setItem("funParty", JSON.stringify(state));
};

export const initQuizSession = config => async (dispatch, getState) => {
  try {
    console.log(config);
    const user = getState().auth.userAuth;
    const { amount, type, id, roomName } = config;
    const req = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount,
        type
      }
    });
    const questions = await req.data.results;
    if (questions.length) {
      const sessions = database.ref(`quiz/sessions/${id}`);
      await sessions.set({
        questions,
        counter: 0,
        private: false,
        id,
        roomName,
        quizMaster: user.uid,
        chat: {},
        players: {},
        maxPlayers: 25
      });

      sessions.on("value", snapshot => {
        console.log(snapshot.val());
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
  roomsListRef.on("value", snap => {
    dispatch({
      type: SET_QUIZ_ROOMS_LIST,
      list: Object.values(snap.val())
    });
  });
  return roomsListRef;
};

export const setQuizCurrentSession = id => async (dispatch, getState) => {
  const currentRoom = database.ref(`/quiz/sessions/${id}`);
  currentRoom.on("value", snap => {
    dispatch({
      type: SET_QUIZ_CURRENT_SESSION,
      session: snap.val()
    });
    setLocalStorage(getState());
  });
  dispatch(joinQuizRoom(id));
};

export const joinQuizRoom = roomId => async (dispatch, getState) => {
  const player = getState().auth.userAuth;
  const playerRef = database.ref(
    `/quiz/sessions/${roomId}/players/${player.uid}`
  );
  playerRef.once("value", snap => {
    if (!snap.val()) {
      playerRef.set(player);
    }
  });
};

export const sendMessage = (id, message) => async (dispatch, getState) => {
  const updates = {};
  updates[`/quiz/sessions/${id}/chat/${message.msgId}`] = message;
  await database.ref().update(updates);
};
