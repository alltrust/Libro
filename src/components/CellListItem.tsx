import { Cell } from '../state';
import CodeCell from './CodeCell';
import TextEditor from './TextEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const { id, type, content } = cell;
  return (
    //display either a text cell or code cell depending on type;
    <div>{type === 'code' ? <CodeCell /> : <TextEditor />}</div>
  );
};

export default CellListItem;
