import styled from "styled-components";
import { Container } from "../../styles/body";

export const LoginContainer = styled(Container).attrs({
  "data-testid": "login-component"
})`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .error-message {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%);
  }

  form {
    border: 1px solid black;
    height: 200px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    label {
      width: 60%;
      display: flex;
      justify-content: space-between;
    }
  }
`;
