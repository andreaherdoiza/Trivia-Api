import { Card } from 'primereact/card';

const Header = ({ playerName }) => {
  return (
    <Card className="header-opacity p-mb-4" style={{ width: '100%', maxWidth: '1300px', textAlign: 'center', padding: '20px' }}>
      <h2 className="p-m-0">Welcome, {playerName}!</h2>
    </Card>
  );
};

export default Header;

