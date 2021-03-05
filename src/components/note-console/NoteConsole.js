import React from "react";
import { ConsoleContainer } from "./style";
import NoteDisplay from "./note-display/NoteDisplay";
import Navigation from "./navigation/Navigation";

function NoteConsole() {
  return (
    <ConsoleContainer>
      <Navigation />
      <NoteDisplay />
    </ConsoleContainer>
  );
}

export default NoteConsole;
