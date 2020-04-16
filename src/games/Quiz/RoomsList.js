import React, { useEffect } from "react";
import styled from "styled-components";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { StyledRoomList } from "../../style/styledComponents";
import { initRoomsListener } from "../../store/actions";

function RoomsList() {
  const dispatch = useDispatch();
  const { roomsList } = useSelector(({ quiz }) => quiz);

  useEffect(() => {
    const roomsListener = dispatch(initRoomsListener());
    return () => roomsListener.off();
  }, [dispatch]);

  return (
    <StyledRoomList className="ui-wrapper">
      <h2>Active Rooms:</h2>
      {roomsList.map(ListItem)}
    </StyledRoomList>
  );
}

export default RoomsList;
