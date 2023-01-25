import React from 'react'
import TableSection from './TableSection';
import logo from '../static/img/logo-trivia.png';

interface GameBoardProps {
	children?: React.ReactNode;
}

const GameBoard: React.FC<GameBoardProps> = ({ children }) => {
	return (
		<div className='gameboard'>
			<h1 className='header-title'>Trivia Marathon</h1>
			<div> 
				<div className='logo-box'>
					<img src={logo} className='logo' alt="Trivia Logo Img" />
				</div>
			</div>
			<div>
				{ children }
			</div>
			<div>
				<TableSection />
			</div>
		</div>
	)
}

export default GameBoard