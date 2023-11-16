import Button from './ui/Button';
import { useDispatchFn } from '../hooks/UseTypedDispatch';

interface AddCellBarProps {
  nextCellId: string | null;
}

const AddCellBar: React.FC<AddCellBarProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useDispatchFn();

  return (
    <div className="m-20 opacity-10 flex hover:opacity-100 transition-opacity duration-300 items-center">
      <div className="add-cell-dividers" />
      <Button
        label="+ Code"
        status="tertiary"
        onClick={() => insertCellBefore({ id: nextCellId, type: 'code' })}
      />
      <div className="add-cell-dividers" />
      <Button
        label="+ Text"
        status="tertiary"
        onClick={() => {
          insertCellBefore({ id: nextCellId, type: 'text' });
        }}
      />
      <div className="add-cell-dividers" />
    </div>
  );
};

export default AddCellBar;
