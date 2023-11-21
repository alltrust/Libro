import { configureStore } from '@reduxjs/toolkit';
import cellReducer from './actions/cells/cellSlice';
import bundlerReducer from './actions/bundler/bundlerSlice';

const store = configureStore({
    reducer: {
        cellReducer: cellReducer,
        bundlerReducer: bundlerReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;

