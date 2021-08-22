import deepmerge from 'deepmerge';
import { darken, transparentize } from 'polished';

import { ExternalConfig } from '../../external';
import {
  LumbyColor,
  LumbyKeys,
  LumbySheet,
  LumbySize,
  LumbyVariant,
} from './lumby.types.d';

// const sizeKeys = ['spacing', 'fontSize', 'borderWidth'];
// const decoratorsKeys = ['elevation', 'colors', 'borderRadius'];
// const variantKeys = ['default', 'plain', 'primary', 'secondary'];
// const statusKeys = [
//   'default',
//   'error',
//   'focus',
//   'hover',
//   'active',
//   'working',
//   'disabled',
// ];

interface Select<T> {
  select: (el: keyof T) => T[keyof T];
}
type Operator<K extends string | number, T = unknown> = Record<K, T> &
  Select<Record<K, T>>;
export interface ThemeShape {
  isDark: boolean;
  colors: Operator<LumbyColor, string>;
  size: Record<LumbyKeys['size'], Record<LumbySize, string | number>>;
  decorators: {
    elevation: Record<number, string>;
    borderRadius: Record<LumbySize, string | number>;
  };
  variants: Record<LumbyVariant, Record<LumbyKeys['status'], LumbySheet>>;
}

export class LumbyTheme {
  isDark = true;
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
  colors: ThemeShape['colors'] = {
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
    select: (color) => this.colors[color],
  };
  decorators: ThemeShape['decorators'] = {
    elevation: {
      0: 'none',
      1: `0px 2px 2px 0px ${darken(0.2, this.colors.light)}`,
      2: `0px 3px 3px 0px ${darken(0.3, this.colors.light)}`,
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
        color: this.colors.light,
        borderColor: this.colors.accent,
        backgroundColor: this.colors.dark,
      },
      error: {
        color: this.colors.light,
        borderColor: this.colors.error,
        backgroundColor: transparentize(0.5, this.colors.error),
      },
      focus: {
        color: this.colors.accent,
        borderColor: transparentize(0.6, this.colors.secondary),
        backgroundColor: transparentize(0.6, this.colors.secondary),
      },
      hover: {
        backgroundColor: transparentize(0.6, this.colors.secondary),
      },
      active: {
        color: this.colors.light,
        borderColor: transparentize(0.6, this.colors.secondary),
      },
      working: {
        color: this.colors.secondary,
        borderColor: this.colors.secondary,
        backgroundColor: transparentize(0.4, this.colors.secondary),
      },
      disabled: {
        borderColor: this.colors.disabled,
        backgroundColor: this.colors.disabled,
        color: darken(0.15, this.colors.disabled),
      },
    },
    plain: {
      default: {
        color: this.colors.light,
        borderColor: 'transparent',
        backgroundColor: this.colors.dark,
      },
      error: {
        color: this.colors.light,
        borderColor: 'transparent',
        backgroundColor: transparentize(0.5, this.colors.error),
      },
      focus: {
        backgroundColor: transparentize(0.8, this.colors.secondary),
      },
      hover: {
        backgroundColor: transparentize(0.95, this.colors.secondary),
      },
      active: {
        backgroundColor: transparentize(0.8, this.colors.secondary),
      },
      working: {
        borderColor: 'transparent',
        color: this.colors.secondary,
        backgroundColor: transparentize(0.4, this.colors.secondary),
      },
      disabled: {
        borderColor: this.colors.disabled,
        backgroundColor: this.colors.disabled,
        color: darken(0.15, this.colors.disabled),
      },
    },
    primary: {
      default: {
        color: this.colors.light,
        borderColor: this.colors.secondary,
        backgroundColor: this.colors.primary,
      },
      error: {
        color: this.colors.light,
        borderColor: transparentize(0.2, this.colors.error),
        backgroundColor: transparentize(0.4, this.colors.error),
      },
      focus: {
        color: this.colors.accent,
        borderColor: transparentize(0.6, this.colors.secondary),
        backgroundColor: transparentize(0.5, this.colors.secondary),
      },
      hover: {
        borderColor: this.colors.secondary,
        backgroundColor: transparentize(0.5, this.colors.ternary),
      },
      active: {
        color: this.colors.accent,
        borderColor: transparentize(0.7, this.colors.secondary),
        backgroundColor: transparentize(0.6, this.colors.secondary),
      },
      working: {
        borderColor: 'transparent',
        color: this.colors.secondary,
        backgroundColor: transparentize(0.4, this.colors.secondary),
      },
      disabled: {
        borderColor: this.colors.disabled,
        backgroundColor: this.colors.disabled,
        color: darken(0.15, this.colors.disabled),
      },
    },
    secondary: {
      default: {
        color: this.colors.primary,
        borderColor: this.colors.secondary,
        backgroundColor: this.colors.secondary,
      },
      error: {
        color: this.colors.light,
        borderColor: 'transparent',
        backgroundColor: transparentize(0.4, this.colors.error),
      },
      focus: {
        color: this.colors.accent,
        borderColor: transparentize(0.4, this.colors.secondary),
        backgroundColor: transparentize(0.8, this.colors.secondary),
      },
      hover: {
        borderColor: this.colors.secondary,
        backgroundColor: transparentize(0.4, this.colors.secondary),
      },
      active: {
        color: this.colors.accent,
        backgroundColor: transparentize(0.6, this.colors.secondary),
      },
      working: {
        borderColor: 'transparent',
        color: this.colors.secondary,
        backgroundColor: transparentize(0.4, this.colors.secondary),
      },
      disabled: {
        borderColor: this.colors.disabled,
        backgroundColor: this.colors.disabled,
        color: darken(0.15, this.colors.disabled),
      },
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
