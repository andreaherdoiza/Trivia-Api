import { useState } from 'react';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Card } from 'primereact/card';

const Questions = ({ question, options, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    onAnswer(selectedOption);
    setSelectedOption(null);
  };

  return (
    <Card className="p-mt-4 panel-opacity" style={{ padding: '20px', borderRadius: '16px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h3 dangerouslySetInnerHTML={{ __html: question }} />
      </div>
      <div className="p-field-radiobutton p-mb-4">
        {options.map((option, index) => (
          <div key={index} className="p-mb-3">
            <RadioButton
              inputId={`option${index}`}
              name="option"
              value={option}
              onChange={(e) => setSelectedOption(e.value)}
              checked={selectedOption === option}
            />
            <label htmlFor={`option${index}`} className="p-ml-2" dangerouslySetInnerHTML={{ __html: option }} />
          </div>
        ))}
      </div>
      <Button
        label="Next"
        icon="pi pi-arrow-right"
        onClick={handleNext}
        className="p-button-rounded p-button-success"
        disabled={!selectedOption}
      />
    </Card>
  );
};

export default Questions;

