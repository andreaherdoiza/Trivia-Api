import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const Form = ({ onStart }) => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState(10);

  const difficulties = [
    { label: '1 Question', value: 1 },
    { label: '2 Questions', value: 2 },
    { label: '3 Questions', value: 3 },
    { label: '4 Questions', value: 4 },
    { label: '5 Question', value: 5 },
    { label: '6 Questions', value: 6 },
    { label: '7 Questions', value: 7 },
    { label: '8 Questions', value: 8 },
    { label: '9 Question', value: 9 },
    { label: '10 Questions', value: 10 },
      ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(name, difficulty);
  };

  return (
    <form onSubmit={handleSubmit} className="p-fluid">
      <div className="p-field">
        <label htmlFor="name">Player Name</label>
        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter your name" />
      </div>
      <div className="p-field">
        <label htmlFor="difficulty">Number of Questions</label>
        <Dropdown id="difficulty" value={difficulty} options={difficulties} onChange={(e) => setDifficulty(e.value)} placeholder="Select difficulty" />
      </div>
      <Button type="submit" label="Start Game" className="p-button-rounded p-button-success" />
    </form>
  );
};

export default Form;


