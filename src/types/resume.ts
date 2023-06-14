export enum Sex {
    MAN = 'man',
    WOMAN = 'woman',
}

export interface MainCredentials {
    phone: string;
    email: string;
}

export interface SecondaryCredentials {
    advantages?: { value: string }[];
    checkbox?: number[];
    radio?: number;
}

// export interface SecondaryCredentials {
//     nickname: string;
//     name: string;
//     sername: string;
//     sex: Sex;
//     advantages: { value: string }[];
//     checkbox: number[];
//     radio: number;
//     about: string;
// }

// const validator = object({
//     nickname: string().max(30),
//     name: string().max(50),
//     sername: string().max(50),
//     sex: string(),
//     advantages: array().of(object({ value: string() })),
//     checkbox: array().of(number()),
//     radio: number(),
//     about: string().max(200),
// });

// const personSchema = yup.object({
//   firstName: yup.string().defined(),
//   nickName: yup.string().default('').nullable(),
//   sex: yup
//     .mixed()
//     .oneOf(['male', 'female', 'other'] as const)
//     .defined(),
//   email: yup.string().nullable().email(),
//   birthDate: yup.date().nullable().min(new Date(1900, 0, 1)),
// });