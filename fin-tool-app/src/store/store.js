import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import inputsReducer from './inputs';

export const store = configureStore({
    reducer: {
        inputs: inputsReducer
    },
    middleware: [thunk]
});
