import React from "react";
import { Field } from "formik";
import styled from "styled-components/macro";

const StyledOption = styled.div`
  display: flex;
  flex: 1 100%;

  & :last-of-type {
    margin-bottom: 2rem;
  }

  label {
    display: flex;
    flex: 1;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    margin: 0.5rem;
    box-shadow: 0 0.3rem 0 0 rgba(0, 0, 0, 0.3), 0 0 0.5rem rgba(0, 0, 0, 0.24);
    font-size: 1.2rem;
    font-weight: 600;
  }

  input {
    display: none;

    &:checked ~ label {
      background-color: green;
      color: white;
    }
  }
`;

function AnswerOption({ label, id, selected, name }) {
  return (
    <StyledOption key={id}>
      <Field
        type="radio"
        checked={selected}
        name={name}
        value={label}
        id={id}
      />
      <label htmlFor={id}>{label}</label>
    </StyledOption>
  );
}

export default AnswerOption;
