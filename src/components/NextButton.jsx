import { Button } from 'primereact/button';

const NextButton = ({ onClick, disabled }) => {
  return (
    <div className="p-mt-4">
      <Button label="Next" icon="pi pi-arrow-right" onClick={onClick} disabled={disabled} />
    </div>
  );
};

export default NextButton;
