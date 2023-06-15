import { createAsyncThunk } from '@reduxjs/toolkit';
import { postResume } from 'api/services/resume';
import { MainCredentials, SecondaryCredentials } from 'types/resume';

export const postResumeAction = createAsyncThunk(
    'resume/postResume',
    ({
        mainCredentials,
        secondaryCredentials,
    }: {
        mainCredentials?: MainCredentials;
        secondaryCredentials?: SecondaryCredentials;
    }) => {
        const normalizeAdvantages = (
            secondaryCredentials?.advantages?.filter((advantage) => advantage.value) as { value: string }[]
        ).map((advantage) => advantage.value);

        return postResume({ ...mainCredentials, ...secondaryCredentials, advantages: normalizeAdvantages });
    },
);
