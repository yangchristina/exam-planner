import * as radixScales from '@radix-ui/colors';
import { Theme } from '@/stitches.config';

const blackOverlay = {
    overlay1: radixScales.blackA.blackA1,
    overlay2: radixScales.blackA.blackA2,
    overlay3: radixScales.blackA.blackA3,
    overlay4: radixScales.blackA.blackA4,
    overlay5: radixScales.blackA.blackA5,
    overlay6: radixScales.blackA.blackA6,
    overlay7: radixScales.blackA.blackA7,
    overlay8: radixScales.blackA.blackA8,
    overlay9: radixScales.blackA.blackA9,
    overlay10: radixScales.blackA.blackA10,
    overlay11: radixScales.blackA.blackA11,
    overlay12: radixScales.blackA.blackA12,
}

const whiteOverlay = {
    overlay1: radixScales.whiteA.whiteA1,
    overlay2: radixScales.whiteA.whiteA2,
    overlay3: radixScales.whiteA.whiteA3,
    overlay4: radixScales.whiteA.whiteA4,
    overlay5: radixScales.whiteA.whiteA5,
    overlay6: radixScales.whiteA.whiteA6,
    overlay7: radixScales.whiteA.whiteA7,
    overlay8: radixScales.whiteA.whiteA8,
    overlay9: radixScales.whiteA.whiteA9,
    overlay10: radixScales.whiteA.whiteA10,
    overlay11: radixScales.whiteA.whiteA11,
    overlay12: radixScales.whiteA.whiteA12,
}

export function mapColor(color: string, alias: string) {
    const obj: { [key: string]: string } = {}
    for (let i = 1; i <= 12; i++) {
        obj[alias + i] = '$' + color + i
    }
    return obj
}

export function createThemeColors(
    theme: Theme,
    isLight: boolean,
    primary: string,
    gray: string,
    error: string,
    success: string,
    info: string,
    warning: string,
    variables: Record<string, string> = {},
    secondary?: string,
) {
    const suffix = isLight ? '' : 'Dark'
    const lightDefaults = {
        ...blackOverlay,
        ...radixScales.whiteA,
        ...mapColor('whiteA', 'overlayB'),
    }
    const darkDefaults = {
        ...whiteOverlay,
        ...radixScales.blackA,
        ...mapColor('blackA', 'overlayB'),
    }
    return {
        ...mapColor(error, 'error'),
        ...mapColor(success, 'success'),
        ...mapColor(info, 'info'),
        ...mapColor(warning, 'warning'),
        ...mapColor(gray, 'gray'),
        ...mapColor(primary, 'primary'),
        ...mapColor(secondary || 'primary', 'secondary'),
        ...(isLight ? lightDefaults : darkDefaults),
        // @ts-expect-error
        ...radixScales[primary + suffix], ...radixScales[gray + suffix], ...radixScales[error + suffix], ...radixScales[success + suffix],
        // @ts-expect-error
        ...radixScales[warning + suffix], ...radixScales[info + suffix], ...radixScales[success + suffix], 
        // @ts-expect-error
        ...(secondary && radixScales[secondary + suffix]),
        ...(theme as any),
        ...variables
    }
}