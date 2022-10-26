import styled from "styled-components";

export const Button = styled.button`
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #eaeaea;

  &:hover {
    background-color: #e0e0e0;
  }
  &:active {
    background-color: #9e9e9e;
  }
  &:disabled {
    opacity: 0.5;
    cursor: inherit;
  }
`;
