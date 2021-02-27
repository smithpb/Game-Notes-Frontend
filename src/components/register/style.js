import styled from "styled-components";
import * as palette from "../../styles/variables";

export const RegisterContainer = styled.div.attrs({
  "data-testid": "register-component",
})`
  width: 100%;

  .valid {
    color: ${palette.success};
  }
  .invalid,
  label + span {
    color: ${palette.error};
  }

  form {
    display: flex;
    flex-direction: column;

    .match {
      background-color: ${palette.success};
    }
    .differ {
      background-color: ${palette.error};
    }
  }
`;
