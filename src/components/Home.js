import React from "react";
import { UIWrapper } from "../style/styledComponents";
import { StyledNavLink } from "../style/styledComponents";

// import { database } from "../firebase/firebase";

import { useDispatch } from "react-redux";

import styled from "styled-components";

const AppWrapper = styled.div`
  display: flex;
  width: 15rem;
  height: 15rem;
  justify-content: center;
  align-items: center;

  .disabled {
    color: #dedede;
  }
`;

const StyledHome = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  flex: 1;
`;

function Home() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const init = () => {
  //     const testRef = database.ref("test/name");
  //     testRef.on("value", snapshot => {
  //       console.log(snapshot.val());
  //     });
  //   };
  //   init();
  // }, []);

  const apps = [
    { name: "Quiz!", disabled: false, path: "/quiz", className: "" },
    {
      name: "Unavailable",
      disabled: true,
      path: "/none",
      className: "disabled"
    },
    {
      name: "Unavailable",
      disabled: true,
      path: "/none",
      className: "disabled"
    },
    {
      name: "Unavailable",
      disabled: true,
      path: "/none",
      className: "disabled"
    }
  ];

  return (
    <StyledHome>
      {apps.map((app, i) => (
        <UIWrapper key={i}>
          <StyledNavLink to={app.path}>
            <AppWrapper>
              <h1 className={app.className}>{app.name}</h1>
            </AppWrapper>
          </StyledNavLink>
        </UIWrapper>
      ))}
    </StyledHome>
  );
}

export default Home;
