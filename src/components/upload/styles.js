import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => {
  return {
    height: '33%',
    width: '100%',
    display: 'flex',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    border: `dashed 3px ${theme.palette.grey[400]}`,
  };
});

export const Form = styled('form')(({ theme }) => {
  return {
    padding: '16px',
    minHeight: '160px',
    textAlign: 'center',
  };
});

export const Image = styled('img')({
  padding: '10px',
  minWidth: '200px',
  minHeight: '200px',
});

export const ContainerButton = styled('div')({
  gap: '5px',
  display: 'flex',
  marginTop: '10px',
  alignItems: 'center',
  justifyContent: 'center',
});
