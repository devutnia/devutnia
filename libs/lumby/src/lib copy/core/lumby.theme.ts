import deepmerge from 'deepmerge';
import { darken, transparentize } from 'polished';

import { ExternalConfig } from '../../external';
import { ThemeSize, ThemeColor, ThemeSheet, ThemeStatus } from './lumby.types.d';

export interface ThemeShape {
  isDark: boolean;
  colors: Record<ThemeColor, string>;
  size: {
    spacing: Record<ThemeSize, string | number>;
    fontSize: Record<ThemeSize, string | number>;
    borderWidth: Record<ThemeSize, string | number>;
  };
  decorators: {
    elevation: Record<number, string>;
    borderRadius: Record<ThemeSize | 'disk', string | number>;
  };
  variants: {
    plain: Record<ThemeStatus, ThemeSheet>;
    default: Record<ThemeStatus, ThemeSheet>;
    primary: Record<ThemeStatus, ThemeSheet>;
    secondary: Record<ThemeStatus, ThemeSheet>;
  };
}

export class LumbyTheme {
  isDark = true;
  size: ThemeShape['size'] = {
    spacing: {
      none: 0,
      xxs: 4,
      xs: 8,
      sm: 12,
      md: 16,
      lg: 24,
      xl: 36,
      xxl: 48,
    },
    fontSize: {
      none: 0,
      xxs: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 22,
      xl: 28,
      xxl: 36,
    },
    borderWidth: {
      none: 0,
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
  };
  decorators: ThemeShape['decorators'] = {
    elevation: {
      0: 'none',
      1: `0px 1px 1px 1px ${transparentize(0.9, this.colors.light)}`,
      2: `0px 3px 3px 0px ${transparentize(0.8, this.colors.light)}`,
    },
    borderRadius: {
      none: 0,
      xxs: 2,
      xs: 3,
      sm: 4,
      md: 6,
      lg: 10,
      xl: 16,
      xxl: 24,
      disk: '100%',
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
        opacity: '0.6',
        borderColor: this.colors.disabled,
        backgroundColor: this.colors.disabled,
        color: darken(0.15, this.colors.disabled),
      },
    },
    plain: {
      default: {
        color: this.colors.light,
        borderColor: 'transparent',
        backgroundColor: transparentize(0.95, this.colors.light),
      },
      error: {
        color: this.colors.light,
        borderColor: 'transparent',
        backgroundColor: transparentize(0.5, this.colors.error),
      },
      focus: {},
      hover: {},
      active: {},
      working: {
        borderColor: 'transparent',
        color: this.colors.secondary,
        backgroundColor: transparentize(0.4, this.colors.secondary),
      },
      disabled: {
        opacity: '0.6',
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
        opacity: '0.6',
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
        opacity: '0.6',
        borderColor: this.colors.disabled,
        backgroundColor: this.colors.disabled,
        color: darken(0.15, this.colors.disabled),
      },
    },
  };
}

const m = <T extends LumbyTheme>(a: T, b: Partial<T>) => deepmerge<T>(a, b);

export function lumbyTheme(newTheme?: Partial<LumbyTheme>) {
  const theme = new LumbyTheme();

  // if lumby.config.json exists in folder root - merge it with the rest
  const externalTheme = Object.create(ExternalConfig.theme) as LumbyTheme;

  if (!externalTheme && newTheme) return m(theme, newTheme);
  if (externalTheme && !newTheme) return m(theme, externalTheme);
  if (externalTheme && newTheme) return m(theme, m(externalTheme, newTheme));
  return theme;
}
