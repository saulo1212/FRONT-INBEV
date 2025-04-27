'use client';

import api from '../../../config/api';
import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession } from './utils';


const initialState = {
  user: null,
  id: '',
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      userId: '',
      user: action.payload.user,
    };
  }
  
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
 
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  return state;
};

const STORAGE_KEY = 'auth';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {

      const auth = await JSON.parse(localStorage.getItem(STORAGE_KEY));

      if (auth && auth.access_token) {
        setSession(auth);

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...auth,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (userLogin, password) => {
    const data = {
      userLogin,
      password,
    };

    const response = await api.post('sessions', data);


      const { id, access_token, name, expiration, email } =
        response.data;

      setSession(response.data);

      dispatch({
        type: 'LOGIN',
        payload: {
          user: {
            id,
            name,
            email,
            expiration,
            access_token,
           
          },
        },
      });
    
  }, []);

  const register = useCallback(async (email, password, firstName, lastName) => {
    const data = {
      email,
      password,
    };

    const response = await axios.post(endpoints.auth.register, data);

    const { accessToken, user } = response.data;

    sessionStorage.setItem(STORAGE_KEY, accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user: {
          ...user,
          accessToken,
        },
      },
    });
  }, []);


  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);


  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      register,
      logout,
    }),
    [login, logout, register, state.user, status],
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
