import styled from "styled-components";

export const NavBar = styled.div.attrs({
  className: "navbar-container",
  "data-testid": "navbar-component",
})`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  align-items: center;
  width: 100%;
  /* height: 35px; */
  border-bottom: 1px solid #000;
  background-color: ${(props) => props.theme.bkgLight};

  p {
    grid-column: 2 / -2;
    text-align: center;
  }

  .log-button {
    grid-column: -2;
    display: grid;
    place-items: center;
  }
`;
