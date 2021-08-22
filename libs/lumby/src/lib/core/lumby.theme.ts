import deepmerge from 'deepmerge';
import { transparentize } from 'polished';

import { ExternalConfig } from '../../external';
import {
  LumbyColor,
  LumbyKeys,
  LumbySheet,
  LumbySize,
  LumbyVariant,
} from './lumby.types.d';

const sizeKeys = ['spacing', 'fontSize', 'borderWidth'];
const decoratorsKeys = ['elevation', 'colors', 'borderRadius'];
const variantKeys = ['default', 'plain', 'primary', 'secondary'];
const statusKeys = [
  'default',
  'error',
  'focus',
  'hover',
  'active',
  'working',
  'disabled',
];

export interface ThemeShape {
  size: Record<LumbyKeys['size'], Record<LumbySize, string | number>>;
  decorators: {
    colors: Record<LumbyColor, string>;
    elevation: Record<0 | 1 | 2, string>;
    borderRadius: Record<LumbySize, string | number>;
  };
  variants: Record<LumbyVariant, Record<LumbyKeys['status'], LumbySheet>>;
}

export class LumbyTheme {
  size: ThemeShape['size'] = {
    spacing: {
      xxs: 4,
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 48,
      xxl: 96,
    },
    fontSize: {
      xxs: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 26,
      xxl: 32,
    },
    borderWidth: {
      xxs: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 26,
      xxl: 32,
    },
  };
  decorators: ThemeShape['decorators'] = {
    elevation: {
      0: 'none',
      1: `0px 3px 1px -2px #afa8a8, 0px 2px 2px 0px #afa8a8, 0px 1px 5px 0px #afa8a8`,
      2: `0px 2px 4px -1px #e0e0e0, 0px 4px 5px 0px #e0e0e0, 0px 1px 10px 0px #e0e0e0`,
    },
    colors: {
      plain: 'transparent',
      default: '#f5f5f5',
      disabled: '#e0e0e0',
      dark: '#142c44',
      light: '#f5f5f5',
      accent: '#ecac6c',
      primary: '#332857',
      secondary: '#a49ccc',
      ternary: '#a49',
      error: '#c42c34',
    },
    borderRadius: {
      xxs: 2,
      xs: 3,
      sm: 4,
      md: 6,
      lg: 10,
      xl: 16,
      xxl: 24,
    },
  };
  variants: ThemeShape['variants'] = {
    default: {
      default: {
        color: this.decorators.colors.dark,
        borderColor: this.decorators.colors.dark,
        backgroundColor: this.decorators.colors.default,
      },
      error: {
        color: this.decorators.colors.light,
        borderColor: this.decorators.colors.error,
        backgroundColor: transparentize(0.5, this.decorators.colors.error),
      },
      focus: {
        borderColor: transparentize(0.6, this.decorators.colors.primary),
      },
      hover: {
        backgroundColor: transparentize(0.6, this.decorators.colors.primary),
      },
      active: {
        borderColor: transparentize(0.6, this.decorators.colors.primary),
      },
      working: {
        color: this.decorators.colors.light,
        borderColor: this.decorators.colors.error,
        backgroundColor: transparentize(0.4, this.decorators.colors.error),
      },
      disabled: {
        color: this.decorators.colors.light,
        borderColor: this.decorators.colors.error,
        backgroundColor: this.decorators.colors.disabled,
      },
    },
    plain: {
      default: {
        color: this.decorators.colors.light,
        borderColor: this.decorators.colors.error,
        backgroundColor: transparentize(0.4, this.decorators.colors.error),
      },
      error: {},
      focus: {},
      hover: {},
      active: {},
      working: {},
      disabled: {},
    },
    primary: {
      default: {
        color: this.decorators.colors.light,
        borderColor: this.decorators.colors.error,
        backgroundColor: transparentize(0.4, this.decorators.colors.error),
      },
      error: {},
      focus: {},
      hover: {},
      active: {},
      working: {},
      disabled: {},
    },
    secondary: {
      default: {
        color: this.decorators.colors.light,
        borderColor: this.decorators.colors.error,
        backgroundColor: transparentize(0.4, this.decorators.colors.error),
      },
      error: {},
      focus: {},
      hover: {},
      active: {},
      working: {},
      disabled: {},
    },
  };
}

const m = (a: any, b: any) => deepmerge<LumbyTheme>(a, b);

export function lumbyTheme(newTheme?: Partial<LumbyTheme>) {
  const theme = new LumbyTheme();
  const externalTheme = Object.create(ExternalConfig.theme) as LumbyTheme;

  if (!externalTheme && newTheme) return m(theme, newTheme);
  if (externalTheme && !newTheme) return m(theme, externalTheme);
  if (externalTheme && newTheme) return m(theme, m(externalTheme, newTheme));
  return theme;
}
