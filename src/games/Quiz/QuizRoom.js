import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import he from "he";
import styled from "styled-components/macro";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  setQuizCurrentSession,
  leaveQuizRoom,
  joinQuizRoom,
  submitAnswer,
  nextQuestion,
} from "../../store/actions";
import Chat from "./Chat";
import PlayersList from "./PlayersList";
import AnswerOption from "./AnswerOption";

const StyledQuizRoom = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;
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

const StyledOptionsFrom = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
`;

const StyledSubmitButtom = styled.button`
  display: flex;
  align-self: center;
  justify-content: center;
  padding: 1rem 2rem;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  background-color: #f41469;
  color: white;
  box-shadow: 0 0.3rem 0 0 rgba(0, 0, 0, 0.3), 0 0.5rem 1rem rgba(0, 0, 0, 0.24);
  border-radius: 1rem;
  outline: none;
`;

const schema = Yup.object().shape({
  answer: Yup.string().required("Please select an option."),
});

function QuizRoom() {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.userAuth);
  const { currentSession } = useSelector(({ quiz }) => quiz);
  const { id } = useParams();

  useEffect(() => {
    dispatch(setQuizCurrentSession(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(joinQuizRoom(id));
    window.addEventListener("beforeunload", (e) => {
      // dispatch(leaveQuizRoom(id));
    });
    return () => {
      dispatch(leaveQuizRoom(id));
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (currentSession && user.uid === currentSession.quizMaster) {
      console.log("Session changed!");
      const { counter, answers, players } = currentSession;
      if (players && answers && answers[counter]) {
        const currentAnswers = answers[counter];
        if (Object.values(players).every((p) => currentAnswers[p.uid])) {
          dispatch(nextQuestion());
        }
      }
    }
  }, [currentSession, user, dispatch]);

  if (!currentSession) return <h1>Loading...</h1>;

  const { questions, counter, answers } = currentSession;

  const currentAnswer =
    answers && answers[counter] && answers[counter][user.uid];

  return currentSession ? (
    <StyledQuizRoom>
      <PlayersList />
      <StyledStageWrapper>
        <Chat />
        <StyledQuizStage className="ui-wrapper">
          <StyledContent>
            <h1>{he.decode(questions[counter].question)}</h1>
            <Formik
              initialValues={{
                answer: "",
              }}
              validationSchema={schema}
              onSubmit={({ answer }, { setSubmitting }) => {
                dispatch(
                  submitAnswer({
                    userId: user.uid,
                    name: `${user.firstName} ${user.lastName}`,
                    answer,
                    questionNumber: counter,
                    roomId: currentSession.id,
                  })
                );
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <StyledOptionsFrom>
                  {questions[counter].answers.map((a, i) => (
                    <AnswerOption
                      key={i}
                      id={i}
                      name="answer"
                      selected={
                        currentAnswer && he.decode(a) === currentAnswer.answer
                      }
                      label={he.decode(a)}
                    />
                  ))}
                  {!currentAnswer && (
                    <StyledSubmitButtom type="submit" disabled={isSubmitting}>
                      Submit
                    </StyledSubmitButtom>
                  )}
                  <ErrorMessage name="answer" component="div" />
                </StyledOptionsFrom>
              )}
            </Formik>
          </StyledContent>
        </StyledQuizStage>
      </StyledStageWrapper>
    </StyledQuizRoom>
  ) : null;
}

export default QuizRoom;
