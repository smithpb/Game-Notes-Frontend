import styled from "styled-components";
import * as palette from "../../styles/variables";

export const RegisterContainer = styled.div.attrs({
  "data-testid": "register-component",
})`
  width: 100%;

  form {
    display: flex;
    flex-direction: column;

    .valid {
      color: ${palette.success};
    }
    .invalid {
      color: ${palette.error};
    }

    .match {
      background-color: ${palette.success};
    }
    .differ {
      background-color: ${palette.error};
    }
  }
`;
