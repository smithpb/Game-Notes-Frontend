import React, { useContext } from "react";
import { AppContext } from "../../../contexts/context";
import { NoteListContainer } from "../style";
import NoteForm from "../../forms/note-form/NoteForm";

function NoteDisplay() {
  const {
    notes: { displayList: notes = [] },
    appState,
  } = useContext(AppContext).state;
  return (
    <NoteListContainer>
      {appState.isLoading && <p>Loading...</p>}
      {notes.map((note) => (
        <p key={note.id}>{note.text}</p>
      ))}
      <NoteForm />
    </NoteListContainer>
  );
}

export default NoteDisplay;
