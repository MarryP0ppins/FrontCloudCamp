import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { cn } from '@bem-react/classname';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import { postResumeAction } from 'store/actions/resume';
import { setSecondaryCredentials } from 'store/reducers/resume';
import { useAppDispatch, useAppSelector } from 'store/store';
import { ThirdFormProps } from 'types/resume';
import { object, ObjectSchema, string } from 'yup';

import { ThirdStepFormProps } from './ThirdStepForm.types';

import './ThirdStepForm.scss';

const CnForm = cn('third-step-form');

export const ThirdStepForm: React.FC<ThirdStepFormProps> = ({ setCurrentStep }) => {
    const dispatch = useAppDispatch();
    const { mainCredentials, secondaryCredentials } = useAppSelector((store) => store.resume);

    const validator: ObjectSchema<ThirdFormProps> = object({
        about: string().max(10, 'Максимальная длина - 200'),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors: formErrors },
    } = useForm<ThirdFormProps>({
        resolver: yupResolver(validator),
        defaultValues: { ...secondaryCredentials },
    });

    const handleFormSubmit = useCallback(
        (func: () => void) => (data: ThirdFormProps) => {
            dispatch(setSecondaryCredentials(data));
            func();
        },
        [dispatch],
    );

    const handlePreviousStep = useCallback(() => setCurrentStep(1), [setCurrentStep]);
    const handleNextStep = useCallback(
        () => dispatch(postResumeAction({ mainCredentials, secondaryCredentials })),
        [dispatch, mainCredentials, secondaryCredentials],
    );

    return (
        <>
            <form className={CnForm('form')}>
                <div className={CnForm('label')}>About</div>
                <textarea
                    {...register('about')}
                    className={CnForm('textarea', { error: Boolean(formErrors.about) })}
                    placeholder="Placeholder"
                ></textarea>
                <FormHelperText disabled error={Boolean(formErrors.about)} className={CnForm('helper')}>
                    {formErrors.about?.message}
                </FormHelperText>
                <FormHelperText disabled error={(watch('about')?.length ?? 0) > 200} className={CnForm('counter')}>
                    {`${watch('about')?.replaceAll(' ', '').length ?? 0}/${watch('about')?.length ?? 0}`}
                </FormHelperText>
            </form>
            <footer className={CnForm('footer')}>
                <Button
                    color="purple"
                    variant="outlined"
                    sx={{ width: 'min-content', height: 44 }}
                    onClick={handleSubmit(handleFormSubmit(handlePreviousStep))}
                >
                    Назад
                </Button>
                <Button
                    color="purple"
                    variant="contained"
                    sx={{ width: 'min-content', height: 44 }}
                    onClick={handleSubmit(handleFormSubmit(handleNextStep))}
                >
                    Отправить
                </Button>
            </footer>
        </>
    );
};
