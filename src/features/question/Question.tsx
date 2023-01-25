import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router-dom'

import GameBoard from '../../components/GameBoard';
import TimeCounter from '../../components/TimeCounter';
import QuestionData from '../../components/QuestionData';

export interface DataProps {
  category: string;
  id: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  question: string;
  tags: string[];
  difficulty: string;
  isNiche: boolean;
}

const Question: React.FC = () => {
  const [data, setData] = useState<DataProps>();

  const { category, difficulty } = useAppSelector(state => state.question)
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) {
      navigate('/trivia-marathon')
    }
    
    const getQuestion = async() => {
      await axios.get(`https://the-trivia-api.com/api/questions?categories=${category}&limit=1&difficulty=${difficulty}`)
        .then(response => setData(response.data[0]))
    }
    getQuestion();
    
  }, [category, difficulty, navigate])
  
  return (
    <GameBoard>
        {
          data &&
          <div className='general-box'>
            <QuestionData data={data}/>
            <TimeCounter />
          </div>
        }
    </GameBoard>
  )
}

export default Question