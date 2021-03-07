import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contexts/context";
import { MainButton } from "../../../styles";
import { axiosReq } from "../../../util/axios/requests";
import { ADD_NOTE } from "../../../reducer/dispatch-types";

function NoteForm() {
  const { state, dispatch } = useContext(AppContext);
  const [note, setNote] = useState("");
  const [quest, setQuest] = useState(false);
  const { characters, campaigns, user } = state;
  const { journey } = campaigns.current;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const len = journey.length;
    const currentLocation = journey[len - 1];
    const newNote = {
      text: note,
      is_quest: quest,
      author_id: user.id,
      campaign_id: campaigns.current.id,
      location_id: currentLocation.location_id,
    };
    const res = await axiosReq("post", "/notes", { note: newNote });
    setNote("");
    setQuest(false);
    dispatch({ type: ADD_NOTE, payload: res.data });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Add a new note..."
          name="note"
          value={note}
          id="note-input"
          cols="30"
          rows="10"
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <label htmlFor="is_quest">Quest?</label>
        <input
          name="is_quest"
          type="checkbox"
          onChange={() => setQuest(!quest)}
        />
        <MainButton type="submit">Add</MainButton>
      </form>
    </div>
  );
}

export default NoteForm;
