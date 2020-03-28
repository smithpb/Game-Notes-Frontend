import styled from "styled-components";

export const NavBar = styled.div.attrs({
  className: "navbar-container",
  "data-testid": "navbar-component"
})`
  position: fixed;
  width: 100%;
  height: 35px;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: pink;

  .log-button {
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translate(0, -50%);
  }
`;
