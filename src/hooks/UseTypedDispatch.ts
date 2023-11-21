import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import type { AppDispatch, ICreatBundle } from '../state';
import {
    updateCell,
    moveCell,
    insertCellAfter,
    deleteCell,
    DeleteCellPayload,
    InsertCellAfterPayload,
    MoveCellPayload,
    UpdateCellPayload,
    createBundle,
} from '../state';

const useAppDispatch: () => AppDispatch = useDispatch;

export const useDispatchFn = () => {
    const dispatch = useAppDispatch();
    return useMemo(() => {

        return {
            updateCell: (payload: UpdateCellPayload) => dispatch(updateCell(payload)),
            moveCell: (payload: MoveCellPayload) => dispatch(moveCell(payload)),
            insertCellBefore: (payload: InsertCellAfterPayload) => dispatch(insertCellAfter(payload)),
            deleteCell: (payload: DeleteCellPayload) => dispatch(deleteCell(payload)),
            createBundle: (payload: ICreatBundle) => dispatch(createBundle(payload))
        };
    }, [dispatch]);

};