import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const BestPlayers = ({ players }) => {
  return (
    <DataTable value={players} responsiveLayout="scroll" emptyMessage="No players yet">
      <Column field="name" header="Player Name" />
      <Column field="score" header="Score" />
    </DataTable>
  );
};

export default BestPlayers;
