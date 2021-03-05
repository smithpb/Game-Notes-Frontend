import React, { useContext } from "react";
import { AppContext } from "../../../contexts/context";
import { NoteListContainer } from "../style";
import NoteForm from "../../forms/note-form/NoteForm";

function NoteDisplay() {
  const { displayList: notes = [] } = useContext(AppContext).state.notes;
  return (
    <NoteListContainer>
      {notes.map((note) => (
        <p key={note.id}>{note.text}</p>
      ))}
      <NoteForm />
    </NoteListContainer>
  );
}

export default NoteDisplay;
