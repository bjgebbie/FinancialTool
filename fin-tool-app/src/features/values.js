import { createSlice } from '@reduxjs/toolkit';

export const valuesSlice = createSlice({
    name: 'values',
    initialState: {
        currentValue: '0.000',
        fairValue: '0.000',
        enterpriseValue: '0.000',
        fairEnterpriseValue: '0.000'

    },
    reducers: {
        setCurrentValue: (state, action) => {
            state.currentValue = action.payload;
        },
        setFairValue: (state, action) => {
            state.fairValue = action.payload;
        },
        setEnterpriseValue: (state, action) => {
            state.enterpriseValue = action.payload;
        },
        setFairEnterpriseValue: (state, action) => {
            state.fairEnterpriseValue = action.payload;
        }
    }
});

export const { setCurrentValue, setFairValue, setEnterpriseValue, setFairEnterpriseValue } = valuesSlice.actions;

export default valuesSlice.reducer;
