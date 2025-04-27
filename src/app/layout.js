/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import PropTypes from 'prop-types';
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
import { LocalizationProvider } from 'src/locales';
import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';
import { AuthProvider } from 'src/auth/context/jwt';


export const metadata = {
  title: 'InBev',
  description: 'Plataforma gestão de usuarios',
  keywords: 'InBev',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: { width: 'device-width', initialScale: 1, maximumScale: 1 },
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'light', 
                themeDirection: 'ltr',
                themeContrast: 'default', 
                themeLayout: 'horizontal', 
                themeColorPresets: 'default', 
                themeStretch: false,
              }}
            >
              <ThemeProvider>
              
                  <MotionLazy>
                    <SettingsDrawer />
                    <ProgressBar />
                    {children}
                  </MotionLazy>
               
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
       
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
