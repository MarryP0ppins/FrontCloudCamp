import { Dispatch, SetStateAction } from 'react';

export interface FirstStepFormProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
}
