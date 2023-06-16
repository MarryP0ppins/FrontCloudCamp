import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import Button from '@mui/material/Button';
import { AccessIcon, CloseIcon, ErrorIcon } from 'assets';
import { clearError } from 'store/reducers/resume';
import { useAppDispatch } from 'store/store';

import { AlertProps } from 'components/Alert/Alert.types';

import './Alert.scss';

const CnAlert = cn('alert');

export const Alert: React.FC<AlertProps> = ({ error, visible, setModalVisible }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleButtonClick = useCallback(() => {
        setModalVisible(false);
        if (error) {
            dispatch(clearError());
        } else {
            navigate('/');
        }
    }, [dispatch, error, navigate, setModalVisible]);

    return (
        <>
            {visible && (
                <div className={CnAlert()}>
                    <div className={CnAlert('paper')}>
                        <div className={CnAlert('header', { error })}>
                            <div className={CnAlert('title')}>{error ? 'Ошибка' : 'Форма успешно отправлена'}</div>
                            {error && <CloseIcon onClick={handleButtonClick} className={CnAlert('close')} />}
                        </div>
                        {error ? <ErrorIcon className={CnAlert('icon')} /> : <AccessIcon className={CnAlert('icon')} />}
                        <div className={CnAlert('footer', { error })}>
                            <Button
                                color="purple"
                                variant="contained"
                                sx={{ width: 'min-content', height: 44, whiteSpace: 'nowrap' }}
                                onClick={handleButtonClick}
                                id={`button-${error ? 'close' : 'to-main'}`}
                            >
                                {error ? 'Закрыть' : 'На главную'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
