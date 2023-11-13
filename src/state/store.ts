import { configureStore } from '@reduxjs/toolkit';
import cellReducer from './actions/cells/cellSlice';

const store = configureStore({
    reducer: {
        cellReducer: cellReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;