import { combineReducers, configureStore } from '@reduxjs/toolkit';

const initialInputsState = {
    growthRate: '0.10',
    discountRate: '0.15',
    years: '10'
};
const inputReducer = (state = initialInputsState, action) => {
    switch (action.type) {
    case 'SET_GROWTH_RATE':
        state = {
            growthRate: action.payload,
            discountRate: '0.15',
            years: '10'
        };
        return state;
    case 'SET_DISCOUNT_RATE':
        return;
    case 'SET_YEARS':
        return;
    default:
        return state;
    }
};

const reducer = combineReducers({ inputReducer });
export const store = configureStore({
    reducer
});

console.log(store.getState());
