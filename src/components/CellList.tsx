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

        return (
          <div className="mt-8 mb-8" key={cell.id}>
            <CellListItem cell={cell} />
          </div>
        );
      })}
    </>
  );
};

export default CellList;
