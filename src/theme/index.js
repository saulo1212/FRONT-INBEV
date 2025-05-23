'use client';

import { useMemo } from 'react';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme as createThemeTable } from 'react-data-table-component';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useSettingsContext } from 'src/components/settings';

import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import RTL from './options/right-to-left';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import { createPresets } from './options/presets';
import { createContrast } from './options/contrast';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';


const queryClient = new QueryClient();
export default function ThemeProvider({ children }) {
  const settings = useSettingsContext();

  const presets = createPresets(settings.themeColorPresets);

  const contrast = createContrast(settings.themeContrast, settings.themeMode);

  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(settings.themeMode),
        ...presets.palette,
        ...contrast.palette,
      },
      customShadows: {
        ...customShadows(settings.themeMode),
        ...presets.customShadows,
      },
      direction: settings.themeDirection,
      shadows: shadows(settings.themeMode),
      shape: { borderRadius: 8 },
      typography,
    }),
    [
      settings.themeMode,
      settings.themeDirection,
      presets.palette,
      presets.customShadows,
      contrast.palette,
    ],
  );

  const theme = createTheme(memoizedValue);

  createThemeTable('dark', {
    background: {
      default: '#212B36',
    },
  });

  theme.components = merge(componentsOverrides(theme), contrast.components);

  return (
    <QueryClientProvider client={queryClient}>
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <RTL themeDirection={settings.themeDirection}>
          <CssBaseline />
          {children}
        </RTL>
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
    </QueryClientProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
