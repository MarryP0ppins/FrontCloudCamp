import { createTheme, PaletteColorOptions } from '@mui/material/styles';

import { createColor } from 'utils/createColor';

declare module '@mui/material/styles' {
    interface Palette {
        purple: PaletteColorOptions;
    }
    interface PaletteOptions {
        purple: PaletteColorOptions;
    }
}

declare module '@mui/material' {
    interface ButtonPropsColorOverrides {
        purple: true;
    }
    interface CheckboxPropsColorOverrides {
        purple: true;
    }
}

export const CUSTOMS_THEMES = createTheme({
    palette: {
        purple: createColor('#5558FA'),
    },
});
