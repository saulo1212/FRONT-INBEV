const ROOTS = {
  AUTH: '/auth',
  REGISTER: '/register',
};

export const paths = {

  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      twoFactor: `${ROOTS.AUTH}/jwt/two-factor`,
    },
  },
  register: {
    root: `${ROOTS.REGISTER}/user`,
    user: {
      root: `${ROOTS.REGISTER}/user`,
    
    },
  },
};
