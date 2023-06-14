import React from 'react';
import { cn } from '@bem-react/classname';

import './Alert.scss';

const CnAlert = cn('alert');

export const Alert: React.FC = () => {
    return <div className={CnAlert()}>Alert</div>;
};
