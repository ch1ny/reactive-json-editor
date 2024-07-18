export const ThemeSuffix = {
  dark: 'dark',
  light: 'light',
} as const;

/**
 * 内置主题
 */
export const Themes = Object.keys(ThemeSuffix) as (keyof typeof ThemeSuffix)[];
