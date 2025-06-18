import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Глобальные стили и анимации
const GlobalStyles = createGlobalStyle`
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }

  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
  }
`;

// Стилизованные компоненты
const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Stars = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="1" fill="white"/></svg>') 
              repeat;
  animation: twinkle 3s linear infinite;
`;

const SatelliteContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;

const Satellite = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background: #2a9d8f;
  border-radius: 50%;
  box-shadow: 0 0 30px #2a9d8f;
  animation: orbit 5s linear infinite;
`;

const Beam = styled.div<{ progress: number }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: ${props => props.progress}%;
  background: linear-gradient(transparent, #2a9d8f);
  transition: height 0.3s ease-out;
`;

const ProgressText = styled.div`
  margin-top: 20px;
  color: white;
  font-family: 'Arial', sans-serif;
  font-size: 1.2rem;
  text-shadow: 0 0 10px rgba(42, 157, 143, 0.5);
`;

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current!);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 300);

    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <LoaderContainer>
      <GlobalStyles />
      <Stars />
      
      <SatelliteContainer>
        <Satellite />
        <Beam progress={progress} />
      </SatelliteContainer>

      <ProgressText>
        Загрузка данных: {Math.round(progress)}%
      </ProgressText>
    </LoaderContainer>
  );
};

export default Loader;