import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { UIWrapper, StyledForm } from "../../style/styledComponents";
import * as Yup from "yup";

const schema = Yup.object().shape({
  url: Yup.string().required("Invite url is required.")
});

function JoinGame() {
  return (
    <UIWrapper>
      <Formik
        initialValues={{ url: "" }}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <StyledForm padding="2rem">
            <h2>Join game:</h2>
            <Field type="text" name="url" placeholder="Invite url..." />
            <ErrorMessage name="url" />
            <button type="submit">Join</button>
          </StyledForm>
        )}
      </Formik>
    </UIWrapper>
  );
}

export default JoinGame;
