import { postApiRequest } from 'api';
import { Sex } from 'types/resume';

export interface ResumeParams {
    phone: string;
    email: string;
    nickname: string;
    name: string;
    sername: string;
    sex: Sex;
    advantages: string[];
    checkbox: number[];
    radio: number;
    about: string;
}

export interface ResumeResponse {
    message: string;
    status: string;
}
export const postResume = async (params: ResumeParams): Promise<ResumeResponse> => {
    return await postApiRequest('/content/v1/bootcamp/frontend/', { params });
};
