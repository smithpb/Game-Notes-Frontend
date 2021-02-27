import styled from "styled-components";
import { Container } from "../../../styles/body";

export const CampListContainer = styled(Container).attrs({
  "data-testid": "campaign-list-component"
})`
  width: 100%;
  background-color: yellow;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px 0;
`;
