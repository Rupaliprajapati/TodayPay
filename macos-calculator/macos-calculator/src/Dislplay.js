import React from 'react';
import styled from 'styled-components';

const DisplayContainer = styled.div`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.color};
  border-radius: 10px;
  padding: 20px;
  font-size: 24px;
  margin-bottom: 20px;
  text-align: right;
`;

const Display = ({ input, result }) => (
  <DisplayContainer>
    <div>{input}</div>
    {result !== null && <div>= {result}</div>}
  </DisplayContainer>
);

export default Display;
