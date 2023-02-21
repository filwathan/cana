import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    amount: null,
    notes: null,
    pin: null,
    recipientId: null,
    dateTrx: null,
};

const transactionReducer = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        wantTrx: (state, action) => {
            state.amount = action.payload.amount
            state.notes = action.payload.notes
            state.recipientId = action.payload.recipientId
            state.dateTrx = action.payload.dateTrx
        },
        addPin: (state, action) => {
            state.pin = action.payload.pin
        },
        byeTrx: (state, action) => {
            state.amount = null
            state.notes = null
            state.pin = null
            state.recipientId = null
            state.dateTrx = null
        },
    }
})

export const {wantTrx, addPin, byeTrx} = transactionReducer.actions

export default transactionReducer.reducer