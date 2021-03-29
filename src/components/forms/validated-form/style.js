import styled from "styled-components";
import * as palette from "../../../styles/variables";
import { Container } from "../../../styles/body";

export const FormContainer = styled(Container).attrs({
  "data-testid": "form-component",
})`
  width: clamp(300px, 60%, 700px);
  display: grid;
  grid-gap: 20px;
  margin: 0 auto;
  padding: 10px 0;
  color: ${(props) => props.theme.textClr};
  background-color: ${(props) => props.theme.bkgLight};
  border-radius: 15px;
  box-shadow: 2px 2px 6px 1px rgba(0, 0, 0, 0.2);
  .form-title {
    text-align: center;
    font-size: 2.8rem;
  }

  .valid {
    color: ${(props) => props.theme.success};
  }
  .invalid,
  .error-message {
    color: ${(props) => props.theme.error};
  }

  form {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px;

    .match {
      border-color: ${(props) => props.theme.success};

      &:focus {
        outline-color: ${(props) => props.theme.success};
        border: 1px solid ${(props) => props.theme.success};
      }
    }
    .differ {
      border-color: ${palette.error};

      &:focus {
        outline: ${palette.error};
      }
    }

    button {
      /* width: 25%; */
      margin: 0 auto;
    }
  }
`;

export const InputField = styled.div`
  width: 80%;
  margin: 0 auto;
  display: grid;
  /* grid-row-gap: 15px;   */
  align-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 2rem min(max-content, 2rem);
  min-height: 4rem;

  label,
  input {
    grid-row: 1;
    grid-column: 1;
  }

  label {
    display: flex;
    align-items: center;
    height: 1.5rem;
    margin-left: 5px;
    z-index: 2;
    padding: 0 10px;
    background-color: ${(props) => props.theme.bkgLight};
    width: fit-content;
    transition: transform 120ms ease-in;
  }

  input {
    background: transparent;
    height: 2.4rem;
    border: 1px solid ${(props) => props.theme.textClr};
    color: ${(props) => props.theme.textClr};
    border-radius: 5px;
    padding: 0 10px;
    box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.2);
    transition: box-shadow 250ms ease-in;
    &:focus,
    &:not(:placeholder-shown) {
      box-shadow: none;
      & + label {
        transform: translate(-8%, -75%) scale(0.8);
        color: ${(props) => props.theme.accentLight};
      }
    }
  }

  .error-message {
    padding-left: 0.2rem;
    /* margin: 5px 0; */
    /* align-self: center; */
    grid: 1 /2;
  }
`;

export const PasswordContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  padding-bottom: 20px;

  p {
    margin-bottom: 5px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, max(80px, 10%));
    grid-column-gap: 20px;
  }
`;
