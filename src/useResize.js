import { useState, useEffect } from 'react';

const getWindowSize = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

const useResize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  useEffect(() => {
    window.addEventListener('resize',handleResize);
    return () => window.removeEventListener('resize',handleResize);
  }, []);
  const handleResize = () => setWindowSize(getWindowSize());
  return windowSize;
};

export default useResize;
