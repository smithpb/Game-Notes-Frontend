import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contexts/context";
import { MainButton } from "../../../styles";
import { axiosReq } from "../../../util/axios/requests";
import { ADD_NOTE, FAILURE } from "../../../reducer/dispatch-types";
import { combineRegEx, makeRegExArr } from "../../../util/text-search/index";
import { pullProperty } from "../../../util/misc";

function NoteForm() {
  const { state, dispatch } = useContext(AppContext);
  const [note, setNote] = useState("");
  const [quest, setQuest] = useState(false);
  const [charSearch, setCharSearch] = useState([]);
  const [taggedChar, setTaggedChar] = useState([]);
  const { characters, campaigns, user } = state;
  const { journey } = campaigns.current;
  const npcs = characters.rawList;
  const regex = combineRegEx(charSearch);

  useEffect(() => {
    const names = pullProperty(npcs, "char_name");
    const searchArr = makeRegExArr(names);
    setCharSearch(searchArr);
  }, [npcs]);

  useEffect(() => {
    const tags = note.match(regex) || [];

    const matchedChars = tags.reduce((acc, tag) => {
      const match = npcs.find(({ char_name }) =>
        char_name.toLowerCase().includes(tag.toLowerCase())
      );
      return [...acc, match];
    }, []);
    setTaggedChar(matchedChars);
    // eslint-disable-next-line
  }, [note]);

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
    const tags = pullProperty(taggedChar, "id");

    try {
      const res = await axiosReq("post", "/notes", { note: newNote, tags });
      dispatch({ type: ADD_NOTE, payload: res.data });
      setNote("");
      setQuest(false);
    } catch (err) {
      dispatch({ type: FAILURE, payload: err.response?.data.message });
    }
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
      {taggedChar.map(({ char_name, id }) => (
        <div key={id}>#{char_name}</div>
      ))}
    </div>
  );
}

export default NoteForm;
