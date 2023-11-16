import { Cell } from '../state';
import ActionBar from './ActionBar';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  return (
    <div>
        <ActionBar cellId={cell.id}/>
      {cell.type === 'code' ? <CodeCell cell={cell} /> : <TextEditor cell={cell} />}
    </div>
  );
};

export default CellListItem;
