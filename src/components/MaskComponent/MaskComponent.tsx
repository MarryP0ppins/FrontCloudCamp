import React from 'react';
import MaskedInput from 'react-text-mask';
import { InputBaseComponentProps } from '@mui/material';

import { PHONE_RU_MASK } from 'components/MaskComponent/constants';

export const MaskComponent: React.FC<InputBaseComponentProps> = (props) => {
    return <MaskedInput mask={PHONE_RU_MASK} {...props} />;
};
