import styled from "styled-components";
import * as palette from "../../styles/variables";
import { Container } from "../../styles/body";

export const RegisterContainer = styled(Container).attrs({
  "data-testid": "register-component",
})`
  /* width: 100%; */

  /* .valid {
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
  } */
`;
