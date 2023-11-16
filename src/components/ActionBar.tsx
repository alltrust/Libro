import Button from './ui/Button';
import { useDispatchFn } from '../hooks/UseTypedDispatch';

interface ActionBarProps {
  cellId: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ cellId }) => {
  const { deleteCell, moveCell } = useDispatchFn();

  return (
    <div className="bg-slate-950 w-full flex flex-row-reverse">
      <Button
        label="Delete"
        status="secondary"
        onClick={() => deleteCell({ id: cellId })}
      />
      <Button
        label="↑"
        status="primary"
        onClick={() => moveCell({ id: cellId, direction: 'up' })}
      />
      <Button
        label="↓"
        status="primary"
        onClick={() => moveCell({ id: cellId, direction: 'down' })}
      />
    </div>
  );
};

export default ActionBar;
