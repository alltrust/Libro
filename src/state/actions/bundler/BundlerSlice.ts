import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BundlesState } from "./bundlerTypes";
import { BundleStartPayload, BundleCompletePayload } from "./bundlerActionsPayload";

const initialState: BundlesState = {};

const bundleSlice = createSlice({
    name: 'bundle',
    initialState,
    reducers: {
        bundleStart: (state, action: PayloadAction<BundleStartPayload>) => {
            const { cellId } = action.payload
            //make bundle request 
            console.log(cellId)
            state[cellId] = {
                isLoading: true,
                code: '',
                err: '',
            }
            return state
        },
        bundleComplete:(state, action: PayloadAction<BundleCompletePayload>)=>{
            const {cellId, bundle} = action.payload
            state[cellId] = {
                isLoading: false,
                code: bundle.code,
                err: bundle.err,
            }
            return state
        }
        
    }
});

export const { bundleStart, bundleComplete } = bundleSlice.actions;
export default bundleSlice.reducer;
