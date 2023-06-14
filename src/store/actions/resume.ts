import { createAsyncThunk } from '@reduxjs/toolkit';
import { postResume, ResumeParams } from 'api/services/resume';

export const postResumeAction = createAsyncThunk('resume/postResume', (resumeParams: ResumeParams) => {
    return postResume(resumeParams);
});
