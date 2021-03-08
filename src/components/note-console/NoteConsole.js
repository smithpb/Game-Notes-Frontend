import React, { useEffect, useContext } from "react";
import { ConsoleContainer } from "./style";
import NoteDisplay from "./note-display/NoteDisplay";
import Navigation from "./navigation/Navigation";
import { AppContext } from "../../contexts/context";
import { fetchCampaignData } from "../../util/axios/requests";

function NoteConsole({ history }) {
  const {
    state: { campaigns },
    dispatch,
  } = useContext(AppContext);

  const id = campaigns.current.id || localStorage.getItem("camp_id");
  useEffect(() => {
    if (!id) history.push("/app");
    fetchCampaignData(dispatch, id);
  }, [dispatch, id]);

  return (
    <ConsoleContainer>
      <Navigation />
      <NoteDisplay />
    </ConsoleContainer>
  );
}

export default NoteConsole;
