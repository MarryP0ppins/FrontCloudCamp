import React, { useCallback } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { cn } from '@bem-react/classname';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { PlusIcon, TrashcanIcon } from 'assets';
import { CHECKBOX_OPTIONS, RADIO_OPTIONS } from 'containers/SecondStepForm/constants';
import { setSecondaryCredentials } from 'store/reducers/resume';
import { useAppDispatch, useAppSelector } from 'store/store';
import { SecondaryCredentials } from 'types/resume';
import { array, number, object, ObjectSchema, string } from 'yup';

import { SecondStepFormProps } from './SecondStepForm.types';

import './SecondStepForm.scss';

const CnForm = cn('second-step-form');

export const SecondStepForm: React.FC<SecondStepFormProps> = ({ setCurrentStep }) => {
    const dispatch = useAppDispatch();
    const { secondaryCredentials } = useAppSelector((store) => store.resume);

    const validator: ObjectSchema<SecondaryCredentials> = object({
        advantages: array().of(object({ value: string().required() })),
        checkbox: array().of(number().defined()),
        radio: number(),
    });

    const {
        control,
        register,
        getValues,
        formState: { errors: formErrors },
    } = useForm<SecondaryCredentials>({
        resolver: yupResolver(validator),
        defaultValues: { advantages: [{ value: '' }], ...secondaryCredentials },
    });

    const {
        fields: advantagesFields,
        append: advantagesAppend,
        remove: advantagesRemove,
    } = useFieldArray<SecondaryCredentials>({ control, name: 'advantages' });

    const handleAddAdvantage = useCallback(() => {
        advantagesAppend({ value: '' });
    }, [advantagesAppend]);

    const handleRemoveAdvantage = useCallback(
        (advantageIndex: number) => () => {
            advantagesRemove(advantageIndex);
        },
        [advantagesRemove],
    );

    const previousStep = useCallback(() => {
        if (Object.keys(formErrors).length === 0) {
            dispatch(setSecondaryCredentials(getValues()));
            setCurrentStep(0);
        }
    }, [dispatch, formErrors, getValues, setCurrentStep]);

    const nextStep = useCallback(() => {
        if (Object.keys(formErrors).length === 0) {
            dispatch(setSecondaryCredentials(getValues()));
            setCurrentStep(2);
        }
        console.log(getValues());
    }, [dispatch, formErrors, getValues, setCurrentStep]);

    return (
        <>
            <form className={CnForm('form')}>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Advantages</div>
                    <div className={CnForm('fields')}>
                        {advantagesFields.map((field, index) => (
                            <div key={field.id} className={CnForm('advantage-field')}>
                                <TextField
                                    inputProps={{ ...register(`advantages.${index}.value`) }}
                                    className={CnForm('text-field')}
                                    InputProps={{ className: CnForm('input') }}
                                    placeholder="Advantage"
                                    size="small"
                                />
                                <div className={CnForm('delete')} onClick={handleRemoveAdvantage(index)}>
                                    <TrashcanIcon />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={CnForm('append')} onClick={handleAddAdvantage}>
                        <PlusIcon width={12} height={12} />
                    </div>
                </div>
                <div className={CnForm('credential')}>
                    <div className={CnForm('label')}>Checkbox group</div>
                    <div className={CnForm('fields')}>
                        {CHECKBOX_OPTIONS.map((label, index) => (
                            <div key={index} className={CnForm('checkbox')}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${index}`}
                                    {...register('checkbox')}
                                    value={label}
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
                            <div key={index} className={CnForm('radio')}>
                                <input
                                    type="radio"
                                    id={`radio-${index}`}
                                    {...register('radio')}
                                    value={label}
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
                    onClick={previousStep}
                    type="submit"
                >
                    Назад
                </Button>
                <Button
                    color="purple"
                    variant="contained"
                    sx={{ width: 'min-content', height: 44 }}
                    onClick={nextStep}
                    type="submit"
                >
                    Далее
                </Button>
            </footer>
        </>
    );
};
