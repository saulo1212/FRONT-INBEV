import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useAuthContext } from 'src/auth/hooks';
import { useSettingsContext } from 'src/components/settings';

import { hideScroll } from 'src/theme/css';

import Logo from 'src/components/logo';
import { NavSectionMini } from 'src/components/nav-section';

import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import NavToggleButton from '../common/nav-toggle-button';

// ----------------------------------------------------------------------

export default function NavMini() {
  const { user } = useAuthContext();
  const settings = useSettingsContext();

  const logoSrc =
    user && user.company.logo
      ? user.company.logo
      : `https://rastreamento.s3.sa-east-1.amazonaws.com/uploads/images/default-${settings.themeMode}.png`;

  const navData = useNavData();

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_MINI },
      }}
    >
      <NavToggleButton
        sx={{
          top: 22,
          left: NAV.W_MINI - 12,
        }}
      />

      <Stack
        sx={{
          pb: 2,
          height: 1,
          position: 'fixed',
          width: NAV.W_MINI,
          borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          ...hideScroll.x,
        }}
      >
        <Logo sx={{ mx: 'auto', my: 2, width: '100%' }} logoSrc={logoSrc} />

        <NavSectionMini
          data={navData}
          slotProps={{
            currentRole: user?.role,
          }}
        />
      </Stack>
    </Box>
  );
}
