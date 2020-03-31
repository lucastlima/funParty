import React from "react";
import * as Yup from "yup";
import { Formik, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { StyledForm, StyledAuthWapper } from "../style/styledComponents";
import { userSignIn } from "../store/actions";
import { useDispatch } from "react-redux";
import { UIWrapper } from "../style/styledComponents";

const schema = Yup.object().shape({
  email: Yup.string().email("Invalid email"),
  password: Yup.string().required("Required")
});

function Login() {
  const dispatch = useDispatch();

  return (
    <StyledAuthWapper>
      <h1>Login</h1>
      <UIWrapper>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            await dispatch(userSignIn(values));
            setSubmitting(false);
          }}
          validationSchema={schema}
        >
          {({ isSubmitting }) => (
            <StyledForm>
              <h3>Email:</h3>
              <Field type="email" placeholder="Email..." name="email" />
              <ErrorMessage name="email" component="div" />
              <h3>Password:</h3>
              <Field
                type="password"
                placeholder="Password..."
                name="password"
              />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <NavLink to="/signup">Sign-Up</NavLink>
            </StyledForm>
          )}
        </Formik>
      </UIWrapper>
    </StyledAuthWapper>
  );
}

export default Login;
