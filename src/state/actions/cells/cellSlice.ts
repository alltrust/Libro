import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { Cell, CellsState } from "./cellTypes";
import { DeleteCellPayload, InsertCellBeforePayload, MoveCellPayload, UpdateCellPayload } from "./cellActionsPayloads";


const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
}

const cellSlice = createSlice({
    name: 'cells',
    initialState,
    reducers: {

        updateCell: (state, action: PayloadAction<UpdateCellPayload>) => {
            const { id, content } = action.payload;
            console.log(content)
            state.data[id].content = content;

            return state;
        },

        deleteCell: (state, action: PayloadAction<DeleteCellPayload>) => {
            const { id } = action.payload;
            delete state.data[id];
            const cellIdx = state.order.findIndex((cellId) => cellId === id);
            if (cellIdx !== -1) state.order.splice(cellIdx, 1);

            return state;
        },

        moveCell: (state, action: PayloadAction<MoveCellPayload>) => {
            const { id, direction } = action.payload;

            const cellIdx = state.order.findIndex((cellId) => cellId == id);
            const targetIdx = direction === "up" ? cellIdx - 1 : cellIdx + 1;

            if (targetIdx > state.order.length - 1 || targetIdx < 0) {
                return state;
            }

            state.order[cellIdx] = state.order[targetIdx];
            state.order[targetIdx] = id;

            return state;
        },

        insertCellAfter: (state, action: PayloadAction<InsertCellBeforePayload>) => {
            const { id, type } = action.payload;

            const cell: Cell = {
                content: '',
                type: type,
                id: randomId()
            };

            state.data[cell.id] = cell;
            const cellIdx = state.order.findIndex((cellId) => cellId === id);

            if (cellIdx < 0) {
                state.order.push(cell.id)
            } else {
                state.order.splice(cellIdx, 0, cell.id);
            }
            return state;
        },
    },
});

export const { updateCell, moveCell, deleteCell, insertCellAfter } = cellSlice.actions;
export default cellSlice.reducer;

const randomId = () => {
    return Math.random().toString(36).substring(2, 5);
};
