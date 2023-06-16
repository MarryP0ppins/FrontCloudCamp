import { Dispatch, SetStateAction } from 'react';

export interface AlertProps {
    error: boolean;
    visible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}
