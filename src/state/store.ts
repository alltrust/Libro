import { configureStore } from '@reduxjs/toolkit';
import cellReducer, { insertCellBefore } from './actions/cells/cellSlice';

const store = configureStore({
    reducer: {
        cellReducer: cellReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;

store.dispatch(insertCellBefore({
    id: null,
    type: "code"
}))
store.dispatch(insertCellBefore({
    id: null,
    type: "text"
}))