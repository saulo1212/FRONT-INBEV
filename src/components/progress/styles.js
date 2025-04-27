import { styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => {
  return {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  };
});
