import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BestPlayers from '../components/BestPlayers';
import Form from '../components/Form';
import { Panel } from 'primereact/panel';
import { Divider } from 'primereact/divider';

const Home = () => {
  const [players, setPlayers] = useState(JSON.parse(localStorage.getItem('players')) || []);
  const navigate = useNavigate();

  const handleStart = (name, difficulty) => {
    localStorage.setItem('currentPlayer', JSON.stringify({ name, difficulty, score: 0 }));
    navigate('/question');
  };

  return (
    <div className="p-d-flex p-flex-column p-ai-center p-jc-center" style={{ minHeight: '100vh', padding: '40px' }}>
      <Panel header="Best Players" className="p-mb-4 panel-opacity" style={{ width: '100%', maxWidth: '1100px', marginTop: '30px', maxHeight: '400px', overflowY: 'auto' }}>
        <BestPlayers players={players} />
      </Panel>

      <Divider className="p-mt-4" />

      <Panel header="Start New Game" className="p-mt-4 panel-opacity" style={{ width: '100%', maxWidth: '1100px' }}>
        <Form onStart={handleStart} />
      </Panel>
    </div>
  );
};

export default Home;

