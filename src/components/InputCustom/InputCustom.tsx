import React from 'react';
import { cn } from '@bem-react/classname';
import Input, { InputProps } from '@mui/material/Input';

import './InputCustom.scss';

const CnInput = cn('input');

export const InputCustom: React.FC<InputProps> = React.forwardRef(({ className, sx, ...props }, ref) => {
    return (
        <Input
            {...props}
            ref={ref}
            sx={{
                ...sx,
                '&::before, ::after': {
                    content: 'unset',
                },
            }}
            className={`${CnInput()} ${className ?? ''}`}
        />
    );
});
