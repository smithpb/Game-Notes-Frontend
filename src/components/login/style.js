import styled from "styled-components";

export const LoginContainer = styled.div.attrs({
  "data-testid": "login-component",
})`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 625px;
  max-height: 750px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-family: "Roboto", sans-serif; */

  .error-message {
    text-align: center;
    width: 75%;
    position: absolute;
    top: 22%;
    left: 50%;
    transform: translate(-50%);
  }

  h1 {
    position: absolute;
    top: 5%;
    width: 100%;
    font-family: "Verdana", sans-serif;
    font-weight: bold;
    font-size: 52px;
    text-align: center;
    line-height: 60px;
    -webkit-text-stroke: 1px ${(props) => props.theme.accentDark};
    color: ${(props) => props.theme.textClr};
  }

  form {
    position: relative;
    height: clamp(260px, 46%, 300px);
    width: clamp(235px, 70%, 275px);
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
    padding-bottom: 20px;
    background: ${(props) => props.theme.bkgLight};
    border-radius: 10px;

    header {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 22%;
      text-align: center;
      background-color: ${(props) => props.theme.accentDark};
      border-radius: 10px 10px 0 0;

      h2 {
        font-size: 48px;
      }
    }

    .inputs {
      padding-top: 18%;
      padding-bottom: 10%;
      width: 100%;

      label {
        width: 65%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;

        input {
          background-color: ${(props) => props.theme.accentLight};
          margin: 8px 0;
          border: none;
          height: 22px;
        }
      }
    }

    button {
      position: relative;
      bottom: 3%;
    }
  }

  .register-container {
    position: absolute;
    bottom: 7%;

    h3 {
      font-size: 24px;
      padding-bottom: 8px;
    }
  }
`;
