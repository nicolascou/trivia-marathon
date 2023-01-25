import React from 'react'
import { useState, useEffect } from 'react';
import { DataProps } from '../features/question/Question';
import { useAppSelector } from '../app/hooks';
import NextButton from './NextButton';
import Option from './Option';

interface QuestionDataProps {
  data: DataProps;
}

const QuestionData: React.FC<QuestionDataProps> = ({ data }) => {
  const [answers, setAnswers] = useState<JSX.Element[]>([])
  const { response } = useAppSelector(state => state.question);

  useEffect(() => {
    // Sort answers randomly
    if (data) {
      const temp = [...data.incorrectAnswers];
      const randomIdx = Math.floor(Math.random() * 3);
      temp.splice(randomIdx, 0, data.correctAnswer);
      setAnswers(temp.map(text => <Option key={text} text={text} correctOption={data.correctAnswer} />));
    }
  }, [data])

  return (
    <div>
      <p className='question-text'>{ data.question }</p>
      <div className='option-container'>
        { answers }
      </div>
      <div className='next-btn-container'>
        {
          response && response !== 'pending' &&
          <NextButton response={response}/>
        }
      </div>
    </div>
  )
}

export default QuestionData