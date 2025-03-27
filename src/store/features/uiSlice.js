import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        ui: {
            addModal: false,
            toast: false,
            showDetails: {
                modal: false,
                type: "",
                city: ""
            }
        }
    },
    reducers: {
        setModal: (state) => {
            state.ui.addModal = !state.ui.addModal;
        },
        setDetailsModal: (state, action) => {
            state.ui.showDetails.modal = !state.ui.showDetails.modal;
        },
        useApi: (state, action) => {
            const { payload } = action;
            
            state.ui.showDetails.type = payload.type;
            state.ui.showDetails.city = payload.city;
            
            console.log(state.ui.showDetails.type, state.ui.showDetails.city);
        }
    }
});

export const { setModal, setDetailsModal, useApi } = uiSlice.actions;
export default uiSlice.reducer;
