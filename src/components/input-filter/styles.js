import { Button, styled } from '@mui/material';

export const TextField = styled('input')(({ theme }) => ({
  height: '42px',
  width: '200px',
  borderRadius: '3px',
  borderTopRightRadius: 0,
  padding: '0 32px 0 16px',
  background: 'transparent',
  borderTopLeftRadius: '5px',
  borderBottomRightRadius: 0,
  borderBottomLeftRadius: '5px',
  border: theme.customShadows.dropdown,

  '&:hover': {
    cursor: 'pointer',
  },
}));

export const ClearButton = styled(Button)({
  width: '34px',
  color: '#FFF',
  height: '42px',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  borderTopLeftRadius: 0,
  justifyContent: 'center',
  borderBottomLeftRadius: 0,
  backgroundColor: '#5119b7',
  borderTopRightRadius: '5px',
  borderBottomRightRadius: '5px',
});
