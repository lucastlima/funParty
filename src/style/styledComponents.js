import styled from "styled-components";
import { Form } from "formik";
import { NavLink } from "react-router-dom";

//Login

export const StyledAuthWapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

//Formik

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: ${({ flexD }) => (flexD ? flexD : "column")};
  padding: ${({ padding }) => (padding ? padding : "4rem")};
  width: 30rem;
  max-width: 90vw;
`;

// UI Elements

export const UIWrapper = styled.div`
  border-radius: 2rem;
  box-shadow: 0 0.6rem 0 0 rgba(0, 0, 0, 0.3), 0 1rem 2rem rgba(0, 0, 0, 0.24);
  background-color: white;
  margin: ${({ margin }) => (margin ? margin : null)};
  padding: ${({ padding }) => (padding ? padding : null)};
`;

// React Router DOM

export const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
`;

//Modal

export const StyledBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: ${({ openState }) => (openState ? "flex" : "none")};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(202, 9, 82, 0.9);
  will-change: opacity;
  animation: fadeIn 0.2s ease-in;
`;
export const StyledContent = styled.div`
  display: flex;
`;

// Quiz

export const StyledQuiz = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: center;

  h1 {
    color: white;
  }

  .menu {
    display: flex;
    justify-content: space-around;
    width: 30rem;
    padding: 2rem;
    font-size: 1.4rem;

    h4 {
      cursor: pointer;
      transition: transform 0.1s ease-in;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

export const StyledRoomList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  width: 30rem;
`;
