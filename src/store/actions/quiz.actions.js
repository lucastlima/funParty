import { database } from "../../firebase/firebase";
import axios from "axios";
import { SET_QUIZROOMSLIST } from "../actionTypes";

export const initQuizSession = config => async (dispatch, getState) => {
  try {
    console.log(config);
    const host = getState().auth.user.uid;
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
        host
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

export const setRoomsList = list => ({
  type: SET_QUIZROOMSLIST,
  list
});

export const initRoomsListener = () => (dispatch, getState) => {
  const roomsListRef = database.ref("quiz/sessions");
  roomsListRef.on("value", snap => {
    const dataObj = snap.val();
    dispatch(setRoomsList(Object.values(dataObj)));
  });
  return roomsListRef;
};
