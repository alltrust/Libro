import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../state';
import { updateCell, moveCell, insertCellBefore, deleteCell, DeleteCellPayload, InsertCellBeforePayload, MoveCellPayload, UpdateCellPayload } from '../state';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useDispatchFn = () => {
    const dispatch = useAppDispatch();
    return {
        updateCell: (payload: UpdateCellPayload) => dispatch(updateCell(payload)),
        moveCell: (payload: MoveCellPayload) => dispatch(moveCell(payload)),
        insertCellBefore: (payload: InsertCellBeforePayload) => dispatch(insertCellBefore(payload)),
        deleteCell: (payload: DeleteCellPayload) => dispatch(deleteCell(payload))
    };
};