import React from 'react'
import GameBoard from './GameBoard';
import { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { setUsername } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom'

const StartGame: React.FC = () => {
  const [value, setValue] = useState<string>(localStorage.getItem('username') || '');
  const [error, setError] = useState<string>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (value === '') {
      setError('You have to introduce a name to play')
      return;
    } else if (value.length > 15) {
      setError('Name must be shorter than 15 characters')
      return;
    }
    localStorage.setItem('username', value);
    dispatch(setUsername(value));
    navigate("/trivia-marathon/pick-category");
  }
  return (
    <GameBoard>
      <div className='general-box'>
        { error && <p className='error'>{error}</p> }
        <input spellCheck={false} placeholder='Write your name...' type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={handleClick}>Play!</button>
      </div>
    </GameBoard>
  )
}

export default StartGame