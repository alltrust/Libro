import { useEffect, useState } from 'react';
import CodeEditor from './CodeEditor';
import Preview from '../components/Preview';
import bundle from '../bundler';
import Resizable from './ui/Resizable';
import { Cell } from '../state';
import { useDispatchFn } from '../hooks/UseTypedDispatch';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell } = useDispatchFn();

  const [err, setErr] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);

      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell({ id: cell.id, content: value })}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
