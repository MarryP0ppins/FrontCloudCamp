import axios, { AxiosError } from 'axios';

export const api = axios.create({
    baseURL: 'https://api.sbercloud.ru/',
});

export const postApiRequest = <ResponseType, BodyType>(link: string, body?: BodyType): Promise<ResponseType> =>
    api
        .post<ResponseType>(link, body)
        .then((res) => res.data)
        .catch((err: AxiosError<Record<string, string>>) => {
            throw JSON.stringify(err.response?.data);
        });
