import { PHONE_RU_MASK } from 'constants/maskComponent';

import React from 'react';
import MaskedInput from 'react-text-mask';
import { InputBaseComponentProps } from '@mui/material';

export const MaskComponent: React.FC<InputBaseComponentProps> = (props) => {
    return <MaskedInput mask={PHONE_RU_MASK} {...props} />;
};
