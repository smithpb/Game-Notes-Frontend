import React, { useContext } from "react";
import { AppContext } from "../../../contexts/context";

function NoteDisplay() {
  const { displayList: notes = [] } = useContext(AppContext).state.notes;
  return (
    <div>
      {notes.map((note) => (
        <p key={note.id}>{note.text}</p>
      ))}
    </div>
  );
}

export default NoteDisplay;
