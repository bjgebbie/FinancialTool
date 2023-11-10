import { createSlice } from '@reduxjs/toolkit';

export const inputsSlice = createSlice({
    name: 'inputs',
    initialState: {
        growthRate: '0.10',
        discountRate: '0.15',
        years: '10'
    },
    reducers: {
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

export const { setGrowthRate, setDiscountRate, setYears } = inputsSlice.actions;

export default inputsSlice.reducer;
