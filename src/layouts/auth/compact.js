import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function AuthCompactLayout({ children, image, title }) {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 500,
        px: { xs: 2, md: 2 },
        pt: { xs: 5, md: 5 },
        pb: { xs: 15, md: 20 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94,
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Typography variant="h6" sx={{ maxWidth: 400, textAlign: 'center' }}>
        {title || 'Cadastre sua empresa e desfrute do sistema por um período de testes.'}

        <Typography>* O período de testes dura 7 dias.</Typography>
        <Typography>* Alguns recurosos no período de testes são limitados.</Typography>
      </Typography>

      <Box
        alt="auth"
        component="img"
        src={image || '/assets/illustrations/illustration_dashboard.png'}
        sx={{
          maxWidth: {
            xs: 450,
            lg: 560,
            xl: 720,
          },
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {mdUp && renderSection}

      {renderContent}
    </Stack>
  );
}

AuthCompactLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};
