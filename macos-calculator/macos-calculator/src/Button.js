import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 5px;
  padding: 20px;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.buttonColor};
    color: ${({ theme }) => theme.buttonBackground};
  }
`;

const Button = ({ label, onClick }) => (
  <StyledButton onClick={onClick}>
    {label}
  </StyledButton>
);

export default Button;
