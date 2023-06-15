import React, { useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { FirstStepForm } from 'containers/FirstStepForm';
import { SecondStepForm } from 'containers/SecondStepForm';
import { ThirdStepForm } from 'containers/ThirdStepForm';
import { useLoader } from 'hooks';
import { useAppSelector } from 'store/store';

import { CustomStepper } from 'components/CustomStepper';

import './CreatePage.scss';

const CnCreate = cn('create-page');

const FORM_STEPS = [1, 2, 3];

export const CreatePage: React.FC = () => {
    const { postResumeStatus } = useAppSelector((store) => store.resume);

    useLoader([postResumeStatus]);

    const [currentStep, setCurrentStep] = useState(0);

    // const validator: ObjectSchema<SecondaryCredentials> = object({
    //     nickname: string()
    //         .max(30, 'Максимальная длина - 30')
    //         .matches(LETTERS_DIGITS_REG, 'Разрешены только буквы и цифры'),
    //     name: string().max(50, 'Максимальная длина - 50').matches(LETTERS_REG, 'Разрешены только буквы'),
    //     sername: string().max(50, 'Максимальная длина - 50').matches(LETTERS_REG, 'Разрешены только буквы'),
    //     sex: string().oneOf(Object.values(Sex)),
    //     advantages: array().of(object({ value: string().required() })),
    //     checkbox: array().of(number().defined()),
    //     radio: number(),
    //     about: string(),
    // });

    //const { fields: checkboxFields } = useFieldArray<SecondaryCredentials>({ control, name: 'checkbox' });

    // if (!mainCredentials) {
    //     return <Navigate to="/" />;
    // }

    const currentForm = useMemo(() => {
        switch (currentStep) {
            case 0:
                return <FirstStepForm setCurrentStep={setCurrentStep} />;
            case 1:
                return <SecondStepForm setCurrentStep={setCurrentStep} />;
            case 2:
                return <ThirdStepForm setCurrentStep={setCurrentStep} />;
            default:
                return <FirstStepForm setCurrentStep={setCurrentStep} />;
        }
    }, [currentStep]);

    return (
        <div className={`layout ${CnCreate()}`}>
            <div className={CnCreate('paper')}>
                <CustomStepper currentStep={currentStep} steps={FORM_STEPS} />
                {currentForm}
            </div>
        </div>
    );
};
