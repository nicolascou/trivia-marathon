import React from 'react'
import { response } from '../features/question/types';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { resetUser } from '../features/user/userSlice';
import { resetQuestion } from '../features/question/questionSlice';
import { useNavigate } from 'react-router-dom';

interface NextButtonProps {
  response: response
}

const NextButton: React.FC<NextButtonProps> = ({ response }) => {
  const { name, points } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (response === 'incorrect' || response === 'timeout') {
      if (points >= 5) {
        axios.post('https://trivia-backend.onrender.com/winners/', {
          name,
          points,
        })
      }
      dispatch(resetUser());
      dispatch(resetQuestion());
      navigate('/trivia-marathon');
    } else if (response === 'correct') {
      dispatch(resetQuestion());
      navigate('/trivia-marathon/pick-category');
    }
  }
  
  return (
    <button className='next-button' onClick={handleClick}>{response === 'correct' ? 'Continue' : 'Play again'}</button>
  )
}

export default NextButton