import { diff } from 'just-diff';
import useDarkMode from 'use-dark-mode';
import { useCallback, useEffect } from 'react';

import { LumbyTheme, lumbyClient } from '../core';

export function useLumby(newTheme?: Partial<LumbyTheme>) {
  const darkMode = useDarkMode(false);
  const setTheme = lumbyClient.useSetTheme();

  useEffect(() => {
    if (newTheme) setTheme(newTheme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = useCallback(
    (toggledTheme?: Partial<LumbyTheme>) => {
      if (toggledTheme) setTheme(toggledTheme);
      darkMode.toggle();
    },
    [darkMode, setTheme]
  );

  const theme = lumbyClient(
    useCallback((lumby) => lumby.theme, []),
    (prev, next) => diff([prev], [next]).length === 0
  );

  return { theme, toggleTheme, darkMode };
}
