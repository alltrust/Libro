import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { initialState} from "./cellTypes";
import { UpdateCellPayload } from "./cellActionsPayloads";

const cellSlice = createSlice({
    name: 'cells',
    initialState,
    reducers: {
        updateCell: (state, action: PayloadAction<UpdateCellPayload>)=>{
            console.log(action)
            const {id, content} = action.payload
            state.data[id].content = content
        }
        
        // increment(state) {
        //     state.value++
        // },
        // decrement(state) {
        //     state.value--
        // },
        // incrementByAmount(state, action: PayloadAction<number>) {
        //     state.value += action.payload
        // },
    },
});

export const { updateCell } = cellSlice.actions;
export default cellSlice.reducer;
