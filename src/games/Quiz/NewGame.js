import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { UIWrapper, StyledForm } from "../../style/styledComponents";
import { initQuizSession } from "../../store/actions";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import { setModal } from "../../store/actions";
import { history } from "../../utils/history";

const schema = Yup.object().shape({
  roomName: Yup.string().required("Required"),
  id: Yup.string().required("Required"),
  amount: Yup.number()
    .moreThan(1, "Min 1 question")
    .lessThan(50, "Max 50 questions")
    .required("Required"),
  type: Yup.string().required("Required")
});

function NewGame() {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        roomName: "",
        id: uuid(),
        amount: "10",
        type: "multiple"
      }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        await dispatch(initQuizSession(values));
        setSubmitting(false);
        dispatch(setModal("quizNewGame"));
        history.push(`/quiz/${values.id}`);
      }}
    >
      {({ isSubmitting }) => (
        <UIWrapper>
          <StyledForm>
            <h2>New Room</h2>
            <h3>Room name:</h3>
            <Field type="text" placeholder="Room name..." name="roomName" />
            <ErrorMessage name="roomName" component="div" />
            <h3>Number of Questions:</h3>
            <Field
              type="text"
              placeholder="Number of Questions..."
              name="amount"
            />
            <ErrorMessage name="amount" component="div" />
            <h3>Select Type:</h3>
            <Field as="select" name="type">
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True or False</option>
            </Field>
            <ErrorMessage name="type" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </StyledForm>
        </UIWrapper>
      )}
    </Formik>
  );
}

export default NewGame;
