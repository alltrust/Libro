import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from '../components/Preview';
import Resizable from './ui/Resizable';
import { Cell} from '../state';
import { useDispatchFn } from '../hooks/UseTypedDispatch';
import { useAppSelector } from '../hooks/UseTypedSelector';
import { useCumulativeCodeSelector } from '../hooks/UseCumulativeCodeSelector';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useDispatchFn();

  const bundle = useAppSelector((state) => state.bundlerReducer[cell.id]);
  const cumulativeCode = useCumulativeCodeSelector(cell.id)

  useEffect(() => {
    if (!bundle) {
      createBundle({ cellId: cell.id, input: cumulativeCode});
      return;
    }

    const timer = setTimeout(async () => {
      createBundle({ cellId: cell.id, input: cumulativeCode });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode, createBundle]);

  return (
    <Resizable direction="vertical">
      <div className="h-full flex flex-row">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell({ id: cell.id, content: value })}
          />
        </Resizable>
        <div className="bg-white h-full grow">
          {!bundle || bundle.isLoading ? (
            <div className="animate-fade-in flex relative h-full items-center justify-center w-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500"></div>
            </div>
          ) : (
            <Preview code={bundle.code} bundlingStatus={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};

export default CodeCell;
