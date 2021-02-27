import React, { useContext } from "react";
import { AppContext } from "../../contexts/context";
import { ConsoleContainer } from "./style";

function NoteConsole() {
  const { campaignList } = useContext(AppContext).state.notes;

  return (
    <ConsoleContainer>
      {campaignList.map((note) => (
        <>
          <p>{note.text}</p>
        </>
      ))}
    </ConsoleContainer>
  );
}

export default NoteConsole;
