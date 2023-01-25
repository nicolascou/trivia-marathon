import React from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { useEffect, useState } from 'react';
import { addPoint } from '../features/user/userSlice';
import { setResponse } from '../features/question/questionSlice';

interface OptionProps {
  text: string;
  correctOption: string;
}

const Option: React.FC<OptionProps> = ({ text, correctOption }) => {
  const { response } = useAppSelector(state => state.question);
  const dispatch = useAppDispatch();
  const [optionClass, setOptionClass] = useState('');

  useEffect(() => {
    if (response && response !== 'pending' && text === correctOption) {
      setOptionClass('correct');
    }
  }, [response, text, correctOption]);

  const handleResponse = () => {
    setOptionClass('sleep-time');
    dispatch(setResponse('pending'));
    setTimeout(() => {
      if (text === correctOption) {
        dispatch(addPoint());
        dispatch(setResponse('correct'));
      } else {
        dispatch(setResponse('incorrect'));
        setOptionClass('incorrect')
      }
    }, 1000)
  }
  
  return (
    <button disabled={!!response} onClick={handleResponse} className={'option-btn '+optionClass} key={text}>{text}</button>
  )
}

export default Option