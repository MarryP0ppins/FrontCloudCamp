import { Dispatch, SetStateAction } from 'react';

export interface ThirdStepFormProps {
    setCurrentStep: Dispatch<SetStateAction<number>>;
}
