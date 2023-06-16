import { LETTERS_DIGITS_REG, LETTERS_REG } from 'constants/firstStepForm';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ArrowIcon } from 'assets';
import { setSecondaryCredentials } from 'store/reducers/resume';
import { useAppDispatch, useAppSelector } from 'store/store';
import { FirstFormProps, Sex } from 'types/resume';
import { object, ObjectSchema, string } from 'yup';

import { FirstStepFormProps } from './FirstStepForm.types';

import './FirstStepForm.scss';

const CnForm = cn('first-step-form');

export const FirstStepForm: React.FC<FirstStepFormProps> = ({ setCurrentStep }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { secondaryCredentials } = useAppSelector((store) => store.resume);

    const validator: ObjectSchema<FirstFormProps> = object({
        nickname: string()
            .max(30, 'Максимальная длина - 30')
            .matches(LETTERS_DIGITS_REG, 'Разрешены только буквы и цифры'),
        name: string().matches(LETTERS_REG, 'Разрешены только буквы').max(50, 'Максимальная длина - 50'),
        sername: string().max(50, 'Максимальная длина - 50').matches(LETTERS_REG, 'Разрешены только буквы'),
        sex: string().oneOf(Object.values(Sex)),
    });

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<FirstFormProps>({
        resolver: yupResolver(validator),
        defaultValues: { ...secondaryCredentials },
    });

    const handleFormSubmit = useCallback(
        (func: () => void) => (data: FirstFormProps) => {
            dispatch(setSecondaryCredentials(data));
            func();
        },
        [dispatch],
    );

    const handlePreviousStep = useCallback(() => navigate('/'), [navigate]);
    const handleNextStep = useCallback(() => setCurrentStep(1), [setCurrentStep]);

    return (
        <>
            <form className={CnForm('form')}>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Nickname</div>
                    <Input
                        {...register('nickname')}
                        sx={{
                            '&::before, ::after': {
                                content: 'unset',
                            },
                        }}
                        className={CnForm('text-field')}
                        placeholder="Placeholder"
                        size="small"
                        error={Boolean(formErrors.nickname)}
                        id="field-nickname"
                    />
                    <FormHelperText disabled error={Boolean(formErrors.nickname)} className={CnForm('helper')}>
                        {formErrors.nickname?.message}
                    </FormHelperText>
                </div>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Name</div>
                    <Input
                        {...register('name')}
                        sx={{
                            '&::before, ::after': {
                                content: 'unset',
                            },
                        }}
                        className={CnForm('text-field')}
                        placeholder="Placeholder"
                        size="small"
                        error={Boolean(formErrors.name)}
                        id="field-name"
                    />
                    <FormHelperText disabled error={Boolean(formErrors.name)} className={CnForm('helper')}>
                        {formErrors.name?.message}
                    </FormHelperText>
                </div>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Sername</div>
                    <Input
                        {...register('sername')}
                        sx={{
                            '&::before, ::after': {
                                content: 'unset',
                            },
                        }}
                        className={CnForm('text-field')}
                        placeholder="Placeholder"
                        size="small"
                        error={Boolean(formErrors.sername)}
                        id="field-sername"
                    />
                    <FormHelperText disabled error={Boolean(formErrors.sername)} className={CnForm('helper')}>
                        {formErrors.sername?.message}
                    </FormHelperText>
                </div>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Sex</div>
                    <Select
                        {...register('sex')}
                        defaultValue={secondaryCredentials?.sex ?? Sex.MAN}
                        displayEmpty
                        className={CnForm('select')}
                        inputProps={{ 'aria-label': 'Without label' }}
                        IconComponent={ArrowIcon}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    '& .MuiMenu-list': {
                                        padding: 0,
                                    },
                                },
                            },
                        }}
                        id="field-sex"
                    >
                        {Object.values(Sex).map((sex, index) => (
                            <MenuItem
                                key={index}
                                value={sex}
                                sx={{ height: 40, minHeight: 40 }}
                                id={`field-sex-option-${sex}`}
                            >
                                {sex}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            </form>
            <footer className={CnForm('footer')}>
                <Button
                    color="purple"
                    variant="outlined"
                    sx={{ width: 'min-content', height: 44 }}
                    onClick={handleSubmit(handleFormSubmit(handlePreviousStep))}
                    id="button-back"
                >
                    Назад
                </Button>
                <Button
                    color="purple"
                    variant="contained"
                    sx={{ width: 'min-content', height: 44, whiteSpace: 'nowrap' }}
                    onClick={handleSubmit(handleFormSubmit(handleNextStep))}
                    id="button-next"
                >
                    Далее
                </Button>
            </footer>
        </>
    );
};
