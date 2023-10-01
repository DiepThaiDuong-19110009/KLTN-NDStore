import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import Loading from '../../components/Loading/Loading';
import authApis from '../../apis/auth.api';
import { setLocalItem } from '../../helpers/storage';
import { LOCAL_STORAGE } from '../../contants/LocalStorage';
import { PATH } from '../../contants/Path';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email chưa được cung cấp')
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Định dạng email không chính xác'),
    password: Yup.string()
      .required('Mật khẩu chưa được cung cấp')
      .min(6, 'Mật khẩu ít nhất phải 6 ký tự')
      .max(40, 'Mật khẩu không vượt quá 40 ký tự'),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    authApis
      .loginAdminApi(data)
      .then((res) => {
        setIsLoading(false);
        if (res.data?.accessToken) {
          setLocalItem(LOCAL_STORAGE.ACCESS_TOKEN, res?.data.accessToken)
          navigate({ pathname: PATH.HOME })
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err)
      });
  };

  return (
    <Grid container justify="center" spacing={3}>
      {isLoading ? <Loading isLoading={isLoading} /> : undefined}
      <Paper>
        <Box>
          <Typography variant="h6" align="center" margin="dense">
            Admin
          </Typography>

          <Grid container justify="center" spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('email')}
              />
              <span style={{ color: 'red' }}>{errors.email?.message}</span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                label="Password"
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('password')}
              />
              <span style={{ color: 'red' }}>{errors.password?.message}</span>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={handleClickShowPassword}
                    name="showPassword"
                    color="primary"
                  />
                }
                label="Hiển thị mật khẩu"
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
