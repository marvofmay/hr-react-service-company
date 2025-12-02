import type { } from '@mui/material/themeCssVarsAugmentation';
import { ThemeOptions, PaletteMode } from '@mui/material/styles';
import { getDesignTokens } from './themePrimitives';
import {
    inputsCustomizations,
    dataDisplayCustomizations,
    feedbackCustomizations,
    navigationCustomizations,
    surfacesCustomizations,
} from './customizations';

export default function getSignUpTheme(mode: PaletteMode): ThemeOptions {
    return {
        ...getDesignTokens(mode),
        components: {
            ...inputsCustomizations,
            ...dataDisplayCustomizations,
            ...feedbackCustomizations,
            ...navigationCustomizations,
            ...surfacesCustomizations,
            MuiButton: {
                styleOverrides: {
                    containedPrimary: {
                        backgroundColor: '#34495e', // Twój niestandardowy kolor
                        '&:hover': {
                            backgroundColor: '#2c3e50', // Kolor na hover
                        },
                    },
                },
            },
        }
    };
}
