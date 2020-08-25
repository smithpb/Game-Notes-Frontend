import styled from "styled-components";

export const MainButton = styled.button`
  padding: 0 15px;
  height: 40px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.accentDark};
  border: none;
  font-size: 22px;
`;
