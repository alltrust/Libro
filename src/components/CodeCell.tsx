import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from '../components/Preview';
import Resizable from './ui/Resizable';
import { Cell } from '../state';
import { useDispatchFn } from '../hooks/UseTypedDispatch';
import { useAppSelector } from '../hooks/UseTypedSelector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useDispatchFn();
  const codeBundle = useAppSelector((state) => state.bundlerReducer[cell.id]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      createBundle({ cellId: cell.id, input: cell.content });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.id, cell.content, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell({ id: cell.id, content: value })}
          />
        </Resizable>
        {codeBundle && (
          <Preview code={codeBundle.code} bundlingStatus={codeBundle.err} />
        )}
      </div>
    </Resizable>
  );
};

export default CodeCell;
