import { createSlice } from "@reduxjs/toolkit";
import { BundlesState } from "./bundlerTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import bundler from "../../../bundler";
import { ICreatBundle } from "./bundlerActionsPayload";


export const createBundle = createAsyncThunk(
    'bundle/createBundle',
    async ({ cellId, input }:ICreatBundle) => {
        const result = await bundler(input);
        return { cellId, bundle: { code: result.code, err: result.err } };
    });

const initialState: BundlesState = {};

const bundleSlice = createSlice({
    name: 'bundle',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createBundle.pending, (state, action)=>{
            const {cellId} = action.meta.arg;
            state[cellId] ={
                isLoading: true,
                err:"",
                code: ""
            }
        }),
        builder.addCase(createBundle.fulfilled, (state, action)=>{
            const {cellId, bundle} = action.payload;
            state[cellId] ={
                isLoading: false,
                err: bundle.err,
                code: bundle.code
            }
        })
    },
});

// export const { } = bundleSlice.actions;
export default bundleSlice.reducer;
