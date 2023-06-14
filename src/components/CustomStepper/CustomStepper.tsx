import React, { useMemo } from 'react';
import { cn } from '@bem-react/classname';
import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { CheckIcon } from 'assets';

import { CustomStepperProps } from './CustomStepper.types';

import './CustomStepper.scss';

const CnStepper = cn('stepper');

export const CustomStepper: React.FC<CustomStepperProps> = ({ currentStep, steps }) => {
    const StepIcon = useMemo(
        () => (props: StepIconProps) => {
            const { completed, active } = props;
            return (
                <div className={CnStepper('circle', { purple: completed || active })}>
                    {completed && <CheckIcon width={10} height={8} />}
                    {active && <div className={CnStepper('active')} />}
                </div>
            );
        },
        [],
    );
    return (
        <Stepper
            activeStep={currentStep}
            connector={
                <StepConnector
                    sx={{
                        left: '-50%',
                        right: '50%',
                        height: '8px',
                        top: '4px',
                    }}
                />
            }
            className={CnStepper('stepper')}
        >
            {steps.map((label, stepIndex) => (
                <Step key={label} sx={{ padding: 0, position: 'relative' }}>
                    <StepLabel StepIconComponent={StepIcon} />
                    <div className={CnStepper('label', { purple: stepIndex <= currentStep })}>{label}</div>
                </Step>
            ))}
        </Stepper>
    );
};
