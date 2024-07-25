import { ParameterService } from "@/services/api_params";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ParameterState {
    medication: ParameterService.Parameter[] | null;
    illness: ParameterService.Parameter[] | null;
    specialNeeds: ParameterService.Parameter[] | null;
    prostheses: ParameterService.Parameter[] | null;
    evacPersonStatuses: ParameterService.Parameter[] | null;
    fieldOperatorStatuses: ParameterService.Parameter[] | null;
}

const initialState: ParameterState = {
    medication: null,
    illness: null,
    specialNeeds: null,
    prostheses: null,
    evacPersonStatuses: null,
    fieldOperatorStatuses: null,
};

const parameterSlice = createSlice({
    name: "parameter",
    initialState,
    reducers: {
        setMedication(
            state,
            action: PayloadAction<ParameterService.Parameter[]>
        ) {
            state.medication = action.payload;
        },
        clearMedication(state) {
            state.medication = null;
        },
        setIllness(state, action: PayloadAction<ParameterService.Parameter[]>) {
            state.illness = action.payload;
        },
        clearIllness(state) {
            state.illness = null;
        },
        setSpecialNeeds(
            state,
            action: PayloadAction<ParameterService.Parameter[]>
        ) {
            state.specialNeeds = action.payload;
        },
        clearSpecialNeeds(state) {
            state.specialNeeds = null;
        },
        setProstheses(
            state,
            action: PayloadAction<ParameterService.Parameter[]>
        ) {
            state.prostheses = action.payload;
        },
        clearProstheses(state) {
            state.prostheses = null;
        },
        setEvacPersonStatuses(
            state,
            action: PayloadAction<ParameterService.Parameter[]>
        ) {
            state.evacPersonStatuses = action.payload;
        },
        clearEvacPersonStatuses(state) {
            state.evacPersonStatuses = null;
        },
        setFieldOperatorStatuses(
            state,
            action: PayloadAction<ParameterService.Parameter[]>
        ) {
            state.fieldOperatorStatuses = action.payload;
        },
        clearFieldOperatorStatuses(state) {
            state.fieldOperatorStatuses = null;
        },
    },
});

export const {
    setMedication,
    clearMedication,
    setIllness,
    clearIllness,
    setSpecialNeeds,
    clearSpecialNeeds,
    setProstheses,
    clearProstheses,
    setEvacPersonStatuses,
    clearEvacPersonStatuses,
    setFieldOperatorStatuses,
    clearFieldOperatorStatuses,
} = parameterSlice.actions;
export default parameterSlice.reducer;
