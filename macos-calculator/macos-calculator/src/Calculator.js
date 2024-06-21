import React, { useState } from 'react';
import Display from './Display';
import Button from './Button';
import ConfettiExplosionComponent from './ConfettiExplosion';
import styled, { ThemeProvider } from 'styled-components';
import { evaluate } from 'mathjs';

const themes = {
  light: {
    background: '#fff',
    color: '#000',
    buttonBackground: '#eee',
    buttonColor: '#000'
  },
  dark: {
    background: '#333',
    color: '#fff',
    buttonBackground: '#555',
    buttonColor: '#fff'
  }
};

const CalculatorContainer = styled.div`
  width: 400px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 20px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const ThemeButton = styled.button`
  background-color: ${({ theme }) => theme.buttonBackground};
  color: ${({ theme }) => theme.buttonColor};
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
`;

const HistoryContainer = styled.div`
  margin-top: 20px;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.buttonBackground};
  border-radius: 10px;
  padding: 10px;
`;

const HistoryItem = styled.div`
  margin-bottom: 5px;
  color: ${({ theme }) => theme.color};
`;

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const [memory, setMemory] = useState(0);
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState([]);

  const handleButtonClick = (btn) => {
    if (btn.type === 'number' || btn.type === 'operation') {
      setInput(input + btn.label);
    } else if (btn.type === 'function') {
      handleFunction(btn.label);
    }
  };

  const handleFunction = (label) => {
    switch (label) {
      case 'AC':
        setInput('');
        setResult(null);
        break;
      case '=':
        try {
          const evaluatedResult = evaluate(input);
          setResult(evaluatedResult);
          setInput('');
          setHistory([...history, `${input} = ${evaluatedResult}`]);
          if (input.includes('5') && input.includes('6')) {
            setConfetti(true);
            setTimeout(() => setConfetti(false), 3000);
          }
        } catch (error) {
          setResult('Error');
        }
        break;
      case 'MC':
        setMemory(0);
        break;
      case 'M+':
        setMemory(memory + (result || parseFloat(input)));
        break;
      case 'M-':
        setMemory(memory - (result || parseFloat(input)));
        break;
      case 'MR':
        setInput(memory.toString());
        break;
      case 'x²':
        setInput((parseFloat(input) ** 2).toString());
        break;
      case 'x³':
        setInput((parseFloat(input) ** 3).toString());
        break;
      case '²√x':
        setInput(Math.sqrt(parseFloat(input)).toString());
        break;
      case '³√x':
        setInput(Math.cbrt(parseFloat(input)).toString());
        break;
      case '!':
        setInput(factorial(parseFloat(input)).toString());
        break;
      case 'Rand':
        setInput(Math.random().toString());
        break;
      default:
        break;
    }
  };

  const factorial = (n) => {
    if (n === 0) return 1;
    let result = 1;
    for (let i = n; i > 1; i--) {
      result *= i;
    }
    return result;
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeProvider theme={themes[theme]}>
      <CalculatorContainer>
        <ThemeButton onClick={toggleTheme}>
          Toggle Theme
        </ThemeButton>
        <Display input={input} result={result} />
        <ButtonGrid>
          {buttons.map((btn, index) => (
            <Button key={index} label={btn.label} type={btn.type} onClick={() => handleButtonClick(btn)} />
          ))}
        </ButtonGrid>
        {confetti && <ConfettiExplosionComponent />}
        <HistoryContainer>
          {history.map((item, index) => (
            <HistoryItem key={index}>{item}</HistoryItem>
          ))}
        </HistoryContainer>
      </CalculatorContainer>
    </ThemeProvider>
  );
};

export default Calculator;
