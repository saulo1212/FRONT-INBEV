import { m } from 'framer-motion';

import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';

export default function LogoutButtom() {
  const router = useRouter();

  const { logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        onClick={handleLogout}
        variants={varHover(1.05)}
        sx={{
          width: 40,
          height: 40,
        }}
      >
        <Iconify icon="solar:logout-2-bold-duotone" width={24} />
      </IconButton>
  );
}
