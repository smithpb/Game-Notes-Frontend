import styled, { createGlobalStyle } from "styled-components";
import * as palette from "./variables";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bkgDark};
    font-family: "Roboto", sans-serif;
    color: ${(props) => props.theme.textClr};
  }
`;

export const Container = styled.div`
  display: grid;
  place-items: center;
`;
