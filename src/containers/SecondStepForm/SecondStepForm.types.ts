import { Dispatch, SetStateAction } from 'react';

export interface SecondStepFormProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
}
