import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../../contexts/context";
import { FILTER_NOTES } from "../../../reducer/dispatch-types";
import { filterByLocation, filterByCharacter } from "../../../util/misc";
import { NavigationContainer } from "../style";

const typeDict = {
  characters: {
    key: "char_name",
    filter: filterByCharacter,
  },
  locations: {
    key: "name",
    filter: filterByLocation,
  },
};

function Navigation() {
  const [selected, setSelected] = useState("");

  return (
    <NavigationContainer>
      <div className={"nav-item" + (selected === "" ? " show" : " hide")}>
        {/* <p onClick={() => setSelected("session")}>Session</p> */}
        <p onClick={() => setSelected("characters")}>Character</p>
        <p onClick={() => setSelected("locations")}>Location</p>
      </div>
      <NavList type={selected} />
    </NavigationContainer>
  );
}

function NavList({ type }) {
  const { state, dispatch } = useContext(AppContext);
  const [list, setList] = useState(state[type]?.displayList || []);
  const [property, setProperty] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setProperty(typeDict[type]?.key);
    setList(state[type]?.displayList || []);
    // eslint-disable-next-line
  }, [type]);

  useEffect(() => {
    const notes = state.notes.rawList;
    const filteredNotes = typeDict[type]?.filter(notes, query) || notes;

    console.log(filteredNotes);
    dispatch({ type: FILTER_NOTES, payload: filteredNotes });
    // eslint-disable-next-line
  }, [query, state.notes.rawList]);

  // const filterNotes = (query) => {
  // };

  return (
    <div>
      {list.map((item) => (
        <p onClick={() => setQuery(item[property])} key={item.id}>
          {item[property]}
        </p>
      ))}
    </div>
  );
}

export default Navigation;
