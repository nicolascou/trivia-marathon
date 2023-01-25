import React from 'react'
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setResponse } from '../features/question/questionSlice';

interface TimeCounterProps {
  time?: number;
}

const TimeCounter: React.FC<TimeCounterProps> = ({ time=30 }) => {
  const [timeLeft, setTimeLeft] = useState(time);
  const [bgColor, setBgColor] = useState('');
  const dispatch = useAppDispatch();
  const { response } = useAppSelector(state => state.question);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    if (response) {
      clearInterval(intervalId)
    }
    
    if (timeLeft <= 0 && !response) {
      dispatch(setResponse('timeout'))
      setBgColor('incorrect')
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timeLeft, response, dispatch]);

  return (
    <div className={'time-counter '+bgColor}>
      { timeLeft === 0 ? 0 : timeLeft}
    </div>
  )
}

export default TimeCounter