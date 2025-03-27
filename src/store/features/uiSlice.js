import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        ui: {
            addModal: false,
            toast: false,
            showDetails: false
        }

    },
    reducers: {
        setModal: (state) => {
            state.ui.addModal = !state.ui.addModal;
        },
        setDetailsModal: (state)=>{
            state.ui.showDetails = !state.ui.showDetails
        }
    }

})

export const { setModal, setDetailsModal} = uiSlice.actions;

export default uiSlice.reducer;
