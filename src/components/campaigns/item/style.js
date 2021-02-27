import styled from "styled-components";

export const Campaign = styled.div.attrs({
  "data-testid": "campaign-list-item"
})`
  border-bottom: 1px solid black;
  margin-bottom: 30px;
  padding-bottom: 15px;
  text-align: center;
  width: 80%;
  position: relative;

  h2 {
    font-weight: bold;
    font-size: 32px;
  }

  .camp-controls {
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 6%;
    top: 10px;
    right: 5%;
  }
`;
