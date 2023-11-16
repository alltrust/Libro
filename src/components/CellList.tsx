import { useAppSelector } from '../hooks/UseTypedSelector';
import AddCellBar from './AddCellBar';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const stateCellOrder = useAppSelector((state) => state.cellReducer.order);
  const stateCellData = useAppSelector((state) => state.cellReducer.data);


  return (
    <>
      <AddCellBar nextCellId={stateCellOrder[0] || null} />
      {stateCellOrder.map((cellId) => {
        const cell = stateCellData[cellId];
        const cellIdx = stateCellOrder.findIndex((id) => id === cellId);

        return (
          <div className="mt-8 mb-8" key={cell.id}>
            <CellListItem cell={cell} />
            <AddCellBar nextCellId={stateCellOrder[cellIdx + 1]} />
          </div>
        );
      })}
    </>
  );
};

export default CellList;
