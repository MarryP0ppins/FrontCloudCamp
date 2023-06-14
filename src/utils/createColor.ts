import { PaletteColor } from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';

export const createColor = (mainColor: string): PaletteColor => {
    const { palette } = createTheme();
    const { augmentColor } = palette;
    return augmentColor({ color: { main: mainColor } });
};
