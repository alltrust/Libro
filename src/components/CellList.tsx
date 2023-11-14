// import { useMemo } from 'react';
import { useAppSelector } from '../hooks/UseTypedSelector';
import CellListItem from './CellListItem';

const CellList: React.FC = () => {
  const stateOrder = useAppSelector((state) => state.cellReducer.order);
  const stateData = useAppSelector((state) => state.cellReducer.data);

  return (
    <>
      {stateOrder.map((cellId) => {
        const cell = stateData[cellId];
        return <CellListItem key={cell.id} cell={cell} />;
      })}
    </>
  );
};

export default CellList;
