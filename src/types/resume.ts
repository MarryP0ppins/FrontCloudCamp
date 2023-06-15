export enum Sex {
    MAN = 'man',
    WOMAN = 'woman',
}

export interface MainCredentials {
    phone: string;
    email: string;
}

export interface FirstFormProps {
    nickname?: string;
    name?: string;
    sername?: string;
    sex?: Sex;
}

export interface SecondFormProps {
    advantages?: { value?: string }[];
    checkbox?: number[];
    radio?: number;
}

export interface ThirdFormProps {
    about?: string;
}

export interface SecondaryCredentials extends FirstFormProps, SecondFormProps, ThirdFormProps {}
