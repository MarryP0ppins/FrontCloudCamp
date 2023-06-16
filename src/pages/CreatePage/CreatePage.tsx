import React, { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { useLoader } from 'hooks';
import { useAppSelector } from 'store/store';

import { Alert } from 'components/Alert';
import { CustomStepper } from 'components/CustomStepper';

import './CreatePage.scss';

const FirstStepForm = React.lazy(() => import('containers/FirstStepForm'));
const SecondStepForm = React.lazy(() => import('containers/SecondStepForm'));
const ThirdStepForm = React.lazy(() => import('containers/ThirdStepForm'));

const CnCreate = cn('create-page');

const FORM_STEPS = [1, 2, 3];

export const CreatePage: React.FC = () => {
    const { postResumeStatus, mainCredentials, error } = useAppSelector((store) => store.resume);

    useLoader([postResumeStatus]);

    const [currentStep, setCurrentStep] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    const currentForm = useMemo(() => {
        switch (currentStep) {
            case 0:
                return <FirstStepForm setCurrentStep={setCurrentStep} />;
            case 1:
                return <SecondStepForm setCurrentStep={setCurrentStep} />;
            case 2:
                return <ThirdStepForm setCurrentStep={setCurrentStep} setModalVisible={setModalVisible} />;
            default:
                return <FirstStepForm setCurrentStep={setCurrentStep} />;
        }
    }, [currentStep]);

    if (!mainCredentials) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Alert error={Boolean(error)} visible={modalVisible} setModalVisible={setModalVisible} />
            <div className={`layout ${CnCreate()}`}>
                <div className={CnCreate('paper')}>
                    <CustomStepper currentStep={currentStep} steps={FORM_STEPS} />
                    {currentForm}
                </div>
            </div>
        </>
    );
};
