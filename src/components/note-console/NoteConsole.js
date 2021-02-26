import React, { useContext } from "react";
import { AppContext } from "../../contexts/context";

function NoteConsole() {
  const { campaignList } = useContext(AppContext).state.notes;

  return (
    <div>
      {campaignList.map((note) => (
        <>
          <p>{note.text}</p>
        </>
      ))}
    </div>
  );
}

export default NoteConsole;
