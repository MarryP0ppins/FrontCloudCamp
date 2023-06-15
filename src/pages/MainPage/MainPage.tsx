import { CREDENTIALS, PHONE_REG } from 'constants/mainPage';

import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { FolderIcon } from 'assets';
import { setMainCredentials } from 'store/reducers/resume';
import { useAppDispatch, useAppSelector } from 'store/store';
import { MainCredentials } from 'types/resume';
import { object, ObjectSchema, string } from 'yup';

import { MaskComponent } from 'components/MaskComponent';

//import { useWindowSizeContext } from 'context/WindowSizeContext';
import './MainPage.scss';

const CnMain = cn('main-page');

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { mainCredentials } = useAppSelector((store) => store.resume);
    const navigate = useNavigate();
    //const { height } = useWindowSizeContext();
    const validator: ObjectSchema<MainCredentials> = object({
        phone: string().matches(PHONE_REG, 'Введите корректный номер').required('Это поле обязательно'),
        email: string().email('Некорректная почта').required('Это поле обязательно'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
    } = useForm<MainCredentials>({
        resolver: yupResolver(validator),
        defaultValues: mainCredentials,
    });

    const handleFormSubmit = useCallback(
        (data: MainCredentials) => {
            dispatch(setMainCredentials(data));
            navigate('/create');
        },
        [dispatch, navigate],
    );

    return (
        <div className={`layout ${CnMain()}`}>
            <div className={CnMain('paper')}>
                <header className={CnMain('header')}>
                    <div className={CnMain('avatar')}>НГ</div>
                    <div className={CnMain('credentials')}>
                        <div className={CnMain('fullName')}>Никита Гордеев</div>
                        <div className={CnMain('contacts')}>
                            {CREDENTIALS.map((credential, index) => (
                                <div className={CnMain('contact')} key={index}>
                                    <FolderIcon />
                                    <a
                                        className={CnMain('link')}
                                        href={credential.href}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {credential.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </header>
                <Divider sx={{ marginTop: '24px' }} />
                <form className={CnMain('form')} onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className={CnMain('field')}>
                        <div className={'field-title'}>Номер телефона</div>
                        <TextField
                            InputProps={{
                                inputComponent: MaskComponent,
                                className: CnMain('input'),
                            }}
                            {...register('phone')}
                            sx={{ marginTop: '8px' }}
                            className={CnMain('text-field')}
                            placeholder="+7 (999) 999-99-99"
                            size="small"
                            error={Boolean(formErrors.phone)}
                        />
                        <FormHelperText disabled error={Boolean(formErrors.phone)} className={CnMain('helper')}>
                            {formErrors.phone?.message}
                        </FormHelperText>
                    </div>
                    <div className={CnMain('field')}>
                        <div className={'field-title'}>Email</div>
                        <TextField
                            inputProps={{ ...register('email') }}
                            sx={{ marginTop: '8px' }}
                            className={CnMain('text-field')}
                            InputProps={{ className: CnMain('input') }}
                            placeholder="sample@email.com"
                            size="small"
                            type="email"
                            error={Boolean(formErrors.email)}
                        />
                        <FormHelperText disabled error={Boolean(formErrors.email)} className={CnMain('helper')}>
                            {formErrors.email?.message}
                        </FormHelperText>
                    </div>
                    <Button
                        color="purple"
                        variant="contained"
                        sx={{ width: 'min-content', height: 44, marginTop: '24px' }}
                        type="submit"
                    >
                        Начать
                    </Button>
                </form>
            </div>
        </div>
    );
};
