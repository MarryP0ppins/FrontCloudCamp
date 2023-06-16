import { ActionCreatorWithoutPayload, createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { ResumeResponse } from 'api/services/resume';
import { postResumeAction } from 'store/actions/resume';
import { FetchStatus } from 'types/api';
import { MainCredentials, SecondaryCredentials } from 'types/resume';

interface ResumeState {
    postResumeStatus: FetchStatus;
    responseData: ResumeResponse | undefined;
    mainCredentials: MainCredentials | undefined;
    secondaryCredentials: SecondaryCredentials | undefined;
    error: unknown;
}

const initialState: ResumeState = {
    postResumeStatus: FetchStatus.INITIAL,
    responseData: undefined,
    mainCredentials: { phone: '+7 (985) 297-55-18', email: 'nagordeev0106@yandex.ru' },
    secondaryCredentials: undefined,
    error: null,
};

const resumeSlice = createSlice<ResumeState, SliceCaseReducers<ResumeState>>({
    name: 'resume',
    initialState,
    reducers: {
        reset: () => initialState,
        setMainCredentials: (state, action: PayloadAction<MainCredentials>) => {
            state.mainCredentials = action.payload;
        },
        setSecondaryCredentials: (state, action: PayloadAction<SecondaryCredentials>) => {
            state.secondaryCredentials = { ...state.secondaryCredentials, ...action.payload };
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postResumeAction.pending, (state) => {
                state.postResumeStatus = FetchStatus.FETCHING;
                state.error = null;
            })
            .addCase(postResumeAction.fulfilled, (state, { payload }) => {
                state.postResumeStatus = FetchStatus.FETCHED;
                state.responseData = payload;
                state.error = null;
            })
            .addCase(postResumeAction.rejected, (state, { error }) => {
                state.postResumeStatus = FetchStatus.ERROR;
                state.error = error;
            });
    },
});

export const { reset, setMainCredentials, setSecondaryCredentials } = resumeSlice.actions;
export const resetResumeState = resumeSlice.actions.reset as ActionCreatorWithoutPayload<string>;
export const clearError = resumeSlice.actions.clearError as ActionCreatorWithoutPayload<string>;
export const resumeReducer = resumeSlice.reducer;
