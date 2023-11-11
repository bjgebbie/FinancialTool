import { configureStore } from '@reduxjs/toolkit';

import inputsReducer from './inputs';
import valuesReducer from './values';

export const store = configureStore({
    reducer: {
        inputs: inputsReducer,
        values: valuesReducer
    }
});
