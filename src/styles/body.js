import styled, { createGlobalStyle } from "styled-components";
import * as palette from "./variables";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  body {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.bkgDark};
  }
`;

export const Container = styled.div`
  position: absolute;
  top: ${palette.navbar_height};
`;
