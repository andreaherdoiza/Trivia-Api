import { useNavigate } from 'react-router-dom';
import BestPlayers from '../components/BestPlayers';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const Result = () => {
  const navigate = useNavigate();
  const players = JSON.parse(localStorage.getItem('players')) || [];
  const currentPlayer = players[players.length - 1];

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center p-jc-center" style={{ minHeight: '100vh', padding: '40px' }}>
      <Card className="panel-opacity p-mb-4" style={{ width: '100%', maxWidth: '1100px', textAlign: 'center' }}>
        <h2>Congratulations, {currentPlayer.name}!</h2>
        <p>Your Score: <strong>{currentPlayer.score}</strong></p>
        <Button label="Play Again" icon="pi pi-refresh" className="p-button-rounded p-button-success" onClick={handlePlayAgain} />
      </Card>

      <BestPlayers players={players} />
    </div>
  );
};

export default Result;
