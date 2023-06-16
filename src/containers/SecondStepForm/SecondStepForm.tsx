import { CHECKBOX_OPTIONS, RADIO_OPTIONS } from 'constants/secondStepForm';

import React, { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { cn } from '@bem-react/classname';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import { PlusIcon, TrashcanIcon } from 'assets';
import { setSecondaryCredentials } from 'store/reducers/resume';
import { useAppDispatch, useAppSelector } from 'store/store';
import { SecondFormProps } from 'types/resume';
import { array, number, object, ObjectSchema, string } from 'yup';

import { SecondStepFormProps } from './SecondStepForm.types';

import './SecondStepForm.scss';

const CnForm = cn('second-step-form');

export const SecondStepForm: React.FC<SecondStepFormProps> = ({ setCurrentStep }) => {
    const dispatch = useAppDispatch();
    const { secondaryCredentials } = useAppSelector((store) => store.resume);

    const validator: ObjectSchema<SecondFormProps> = object({
        advantages: array().of(object({ value: string() })),
        checkbox: array().of(number().defined()),
        radio: number().transform((value: number) => (value === null ? undefined : value)),
    });

    const { control, register, handleSubmit } = useForm<SecondFormProps>({
        resolver: yupResolver(validator),
        defaultValues: { advantages: [{ value: '' }], checkbox: [], radio: undefined, ...secondaryCredentials },
    });

    const {
        fields: advantagesFields,
        append: advantagesAppend,
        remove: advantagesRemove,
    } = useFieldArray<SecondFormProps>({ control, name: 'advantages' });

    const handleAddAdvantage = useCallback(() => {
        advantagesAppend({ value: '' });
    }, [advantagesAppend]);

    const handleRemoveAdvantage = useCallback(
        (advantageIndex: number) => () => {
            advantagesRemove(advantageIndex);
        },
        [advantagesRemove],
    );

    const handleFormSubmit = useCallback(
        (func: () => void) => (data: SecondFormProps) => {
            dispatch(setSecondaryCredentials(data));
            func();
        },
        [dispatch],
    );

    const handlePreviousStep = useCallback(() => setCurrentStep(0), [setCurrentStep]);
    const handleNextStep = useCallback(() => setCurrentStep(2), [setCurrentStep]);

    return (
        <>
            <form className={CnForm('form')}>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Advantages</div>
                    <div className={CnForm('fields')}>
                        {advantagesFields.map((field, index) => (
                            <div key={field.id} className={CnForm('advantage-field')}>
                                <Input
                                    {...register(`advantages.${index}.value`)}
                                    sx={{
                                        '&::before, ::after': {
                                            content: 'unset',
                                        },
                                    }}
                                    className={CnForm('text-field')}
                                    placeholder="Advantage"
                                    size="small"
                                    id={`field-advatages-${index + 1}`}
                                />
                                <div
                                    className={CnForm('delete')}
                                    onClick={handleRemoveAdvantage(index)}
                                    id={`button-remove-${index + 1}`}
                                >
                                    <TrashcanIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={CnForm('append')} onClick={handleAddAdvantage} id={'button add'}>
                        <PlusIcon width={12} height={12} />
                    </div>
                </div>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Checkbox group</div>
                    <div className={CnForm('fields')}>
                        {CHECKBOX_OPTIONS.map((label, index) => (
                            <div
                                key={index}
                                className={CnForm('checkbox')}
                                id={`field-checkbox-group-option-${index + 1}`}
                            >
                                <input
                                    type="checkbox"
                                    id={`checkbox-${index}`}
                                    {...register('checkbox')}
                                    value={label}
                                    defaultChecked={secondaryCredentials?.checkbox?.includes(label)}
                                    className={CnForm('checkbox-input')}
                                />
                                <label className={CnForm('checkbox-label')} htmlFor={`checkbox-${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Radio group</div>
                    <div className={CnForm('fields')}>
                        {RADIO_OPTIONS.map((label, index) => (
                            <div key={index} className={CnForm('radio')} id={`field-radio-group-option-${index + 1}`}>
                                <input
                                    type="radio"
                                    id={`radio-${index}`}
                                    {...register('radio')}
                                    value={label}
                                    defaultChecked={secondaryCredentials?.radio === label}
                                    className={CnForm('radio-input')}
                                />
                                <label className={CnForm('radio-label')} htmlFor={`checkbox-${index}`}>
                                    {label}
                                </label>
                            </div>
                        ))}
                    </div>
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
                    sx={{ width: 'min-content', height: 44 }}
                    onClick={handleSubmit(handleFormSubmit(handleNextStep))}
                    id="button-next"
                >
                    Далее
                </Button>
            </footer>
        </>
    );
};
