import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { StyledForm, StyledAuthWapper } from "../style/styledComponents";
import * as Yup from "yup";
import { userSignUp } from "../store/actions";
import { useDispatch } from "react-redux";
import { UIWrapper } from "../style/styledComponents";

const schema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email"),
  password: Yup.string().required("Required"),
  confirmPassword: Yup.string()
    .required("Please confirm your password.")
    .oneOf([Yup.ref("password"), null], "Password does't match!")
});

function SignUp() {
  const dispatch = useDispatch();

  return (
    <StyledAuthWapper>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: ""
        }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          await dispatch(userSignUp(values));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <UIWrapper>
            <StyledForm>
              <h3>First Name:</h3>
              <Field type="text" placeholder="First name..." name="firstName" />
              <ErrorMessage name="firstName" component="div" />
              <h3>Last Name:</h3>
              <Field type="text" placeholder="Last name..." name="lastName" />
              <ErrorMessage name="lastName" component="div" />
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
              <h3>Confirm Password:</h3>
              <Field
                type="password"
                placeholder="Confirm password..."
                name="confirmPassword"
              />
              <ErrorMessage name="confirmPassword" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <NavLink to="/login">Login</NavLink>
            </StyledForm>
          </UIWrapper>
        )}
      </Formik>
    </StyledAuthWapper>
  );
}

export default SignUp;
