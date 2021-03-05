import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contexts/context";
import { MainButton } from "../../../styles";

function NoteForm() {
  const [input, setInput] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const { characters } = state;
  return (
    <div>
      <form>
        <textarea
          placeholder="Add a new note..."
          name="note"
          id="note-input"
          cols="30"
          rows="10"
        ></textarea>
        <MainButton type="submit">Add</MainButton>
      </form>
    </div>
  );
}

export default NoteForm;
