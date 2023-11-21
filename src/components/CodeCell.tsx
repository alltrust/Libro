import { useEffect } from 'react';
import CodeEditor from './CodeEditor';
import Preview from '../components/Preview';
import Resizable from './ui/Resizable';
import { Cell, RootState } from '../state';
import { useDispatchFn } from '../hooks/UseTypedDispatch';
import { useAppSelector } from '../hooks/UseTypedSelector';
import { createSelector } from '@reduxjs/toolkit';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useDispatchFn();

  const bundle = useAppSelector((state) => state.bundlerReducer[cell.id]);

  const cellSelector = (state: RootState) => state.cellReducer;

  const cumulativeCodeSelector = createSelector(
    [cellSelector],
    (cellReducer) => {
      const { data, order } = cellReducer;
      const orderedCells = order.map((id) => data[id]);
      const cumulativeCode = [];
      
      for (const c of orderedCells) {
        if (c.type === 'code') {
          cumulativeCode.push(c.content);
        }
        if (c.id === cell.id) {
          break;
        }
      }
      return cumulativeCode;
    },
  );

  const cumulativeCode = useAppSelector(cumulativeCodeSelector);

  useEffect(() => {
    if (!bundle) {
      createBundle({ cellId: cell.id, input: cumulativeCode.join('\n') });
      return;
    }

    const timer = setTimeout(async () => {
      createBundle({ cellId: cell.id, input: cumulativeCode.join('\n') });
    }, 1000);

    return () => {
      clearTimeout(timer);
    };

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n'), createBundle]);

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
