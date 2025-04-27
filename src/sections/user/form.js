'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  FormControlLabel,
  Checkbox,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import Iconify from 'src/components/iconify/iconify';

export default function Form({ form, onChangeForm, selectedId }) {
  const {
    name,
    userLogin,
    email,
    password,
    active,
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Grid container spacing={3}>
    
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          value={name}
          variant="outlined"
          label="Nome Completo"
          onChange={onChangeForm('name')}
        />
      </Grid>

      <Grid item md={selectedId ? 6 : 4} xs={12}>
        <TextField
          fullWidth
          label="Usuario"
          value={userLogin}
          variant="outlined"
          onChange={onChangeForm('userLogin')}
        />
      </Grid>

      <Grid item md={selectedId ? 6 : 4} xs={12}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          variant="outlined"
          onChange={onChangeForm('email')}
        />
      </Grid>

      {!selectedId && (
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="Senha"
            value={password}
            variant="outlined"
            onChange={onChangeForm('password')}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      )}

      <Grid item md={2} xs={12}>
        <FormControlLabel
          label="Ativo"
          control={
            <Checkbox
              checked={active}
              onChange={({ target: { checked } }) =>
                onChangeForm('active')({ target: { value: checked } })
              }
            />
          }
        />
      </Grid>
    </Grid>
  );
}

Form.propTypes = {
  form: PropTypes.object,
  selectedId: PropTypes.string,
  onChangeForm: PropTypes.func,
};
