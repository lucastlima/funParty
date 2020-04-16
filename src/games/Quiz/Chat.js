import React, { useEffect } from "react";
import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { sendMessage } from "../../store/actions";

const StyledQuizChat = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 16rem;
  padding: 2rem;
`;

const StyledChatInput = styled(Field)`
  border: 2px solid #f41469;
  border-radius: 2rem;
  width: 100%;
  margin-right: 0.5rem;
  line-height: 1.6rem;
  outline: none;
  padding: 0 0.5rem;
  font-size: 1rem;
`;
const StyledChatForm = styled(Form)`
  display: flex;
`;

const StyledChatBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 10rem;
  margin-bottom: 1rem;
  overflow-y: auto;
`;

function Chat() {
  const dispatch = useDispatch();
  const chatBoxRef = React.createRef();
  const user = useSelector(({ auth }) => auth.userAuth);
  const { chat, id } = useSelector(({ quiz }) => quiz.currentSession);

  useEffect(() => {
    const chatbox = chatBoxRef.current;
    chatbox.scrollTop = chatbox.scrollHeight;
  }, [chat, chatBoxRef]);

  const returnChatMessages = () => {
    if (chat) {
      return Object.values(chat)
        .sort((a, b) => a.timestamp - b.timestamp)
        .map(m => {
          return (
            <div key={m.msgId}>
              <p>
                <b>{`${m.userName} says:`}</b>
              </p>
              <span>{m.message}</span>
            </div>
          );
        });
    } else {
      return null;
    }
  };

  return (
    <StyledQuizChat className="ui-wrapper">
      <h2>Chat:</h2>
      <StyledChatBox ref={chatBoxRef}>{returnChatMessages()}</StyledChatBox>
      <Formik
        enableReinitialize={true}
        initialValues={{
          message: "",
          msgId: uuid(),
          userName: `${user.firstName} ${user.lastName}`,
          timestamp: new Date().valueOf()
        }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          await dispatch(sendMessage(id, values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <StyledChatForm>
            <StyledChatInput type="text" name="message" />
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </StyledChatForm>
        )}
      </Formik>
    </StyledQuizChat>
  );
}

export default Chat;
