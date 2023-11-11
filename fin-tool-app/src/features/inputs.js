import { createSlice } from '@reduxjs/toolkit';

export const inputsSlice = createSlice({
    name: 'inputs',
    initialState: {
        symbol: '',
        growthRate: '0.10',
        discountRate: '0.15',
        years: '10'
    },
    reducers: {
        setSymbol: (state, action) => {
            state.symbol = action.payload;
        },
        setGrowthRate: (state, action) => {
            state.growthRate = action.payload;
        },
        setDiscountRate: (state, action) => {
            state.discountRate = action.payload;
        },
        setYears: (state, action) => {
            state.years = action.payload;
        }
    }
});

export const { setSymbol, setGrowthRate, setDiscountRate, setYears } = inputsSlice.actions;

export default inputsSlice.reducer;
