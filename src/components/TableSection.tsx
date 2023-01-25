import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface PlayerProps {
  name: string;
  points: number;
}

const TableSection: React.FC = () => {
  const [winners, setWinners] = useState<PlayerProps[]>()
  useEffect(() => {
    const fetchWinners = async() => {
      await axios.get('https://trivia-backend.onrender.com/winners/')
        .then(response => response.data)
        .then(data => setWinners(data.slice(0, 10)))
    }
    fetchWinners();
  }, [])

  return (
    <div className='table-wrapper'>
      <h3>Highest punctuations</h3>
      <div className='table'>
        <div>
          <div className='table-head'>
            <p className='font-bold'>Players</p>
            <p className='font-bold'>Hits</p>
          </div>
          { winners &&
            winners.map((player: PlayerProps) => (
              <div key={player.name} className='table-cell'>
                <p>{player.name}</p>
                <p>{player.points}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default React.memo(TableSection);