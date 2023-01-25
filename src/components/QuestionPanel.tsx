import { useState, useEffect } from 'react';
import { normalizeCategory } from '../hooks/useDisplayCategory';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setQuestion } from '../features/question/questionSlice';

import { useNavigate } from 'react-router-dom';
import GameBoard from './GameBoard';
// eslint-disable-next-line
const categories = [
	'arts_and_literature',
	'film_and_tv',
	'food_and_drink',
	'general_knowledge',
	'geography',
	'history',
	'music',
	'science',
	'society_and_culture',
	'sport_and_leisure'
]

const QuestionPanel: React.FC = () => {
	const [options, setOptions] = useState<string[]>([]);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { name, points } = useAppSelector(state => state.user);

	useEffect(() => {
		if (!name) {
			navigate('/trivia-marathon')
		}
		
		const temp: string[] = ['', '']
		let i: number = 0;
	  while(i < 2) {
			temp[i] = categories[Math.floor(Math.random() * categories.length)];
			temp[0] !== temp[1] && i++; 
	  }
		setOptions(temp);
	}, [name, navigate])

	const handleClick = (i: number) => {
		let level: 'easy' | 'medium' | 'hard';
		if (points < 4) {
			level = 'easy';
		} else if (points < 10) {
			level = 'medium'
		} else {
			level = 'hard'
		}
		dispatch(setQuestion({category: options[i], difficulty: level}));
		navigate('/trivia-marathon/question');
	}

  return (
		<GameBoard>
			<div className='general-box'>
				<h2>{ points } hits</h2>
				{
					<div className='options'>
						<button onClick={() => handleClick(0)}>
							{options[0] && normalizeCategory(options[0])}
						</button>
						<button onClick={() => handleClick(1)}>
							{options[1] && normalizeCategory(options[1])}
						</button>
					</div>
				}
			</div>
		</GameBoard>
  )
}

export default QuestionPanel