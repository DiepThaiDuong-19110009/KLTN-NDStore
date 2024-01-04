import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import '../Login/Login.css'

import {
  TextField,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';
import Loading from '../../components/Loading/Loading';
import authApis from '../../apis/auth.api';
import { setLocalItem } from '../../helpers/storage';
import { LOCAL_STORAGE } from '../../contants/LocalStorage';
import { PATH } from '../../contants/Path';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

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
    setIsLoading(true)
    authApis
      .loginAdminApi(data)
      .then((res) => {
        if (res.data?.accessToken) {
          if (res.data?.role === 'Role_Admin') {
            setLocalItem(LOCAL_STORAGE.ACCESS_TOKEN, res?.data.accessToken)
            setLocalItem(LOCAL_STORAGE.USER_INFOR, {
              id: res?.data?.id, email: res?.data?.email,
              name: res?.data?.name, avatar: res?.data?.avatar
            })
            setIsLoading(false);
            navigate(PATH.HOME)
          } else if (res.data?.role === 'Role_User') {
            setMessage('Vui lòng kiểm tra lại tài khoản');
            setOpenPopup(true);
            setIsLoading(false);
          }
        } else if (res?.success === false) {
          setMessage('Vui lòng kiểm tra lại email hoặc mật khẩu');
          setOpenPopup(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err) {
          setMessage('Vui lòng kiểm tra lại email hoặc mật khẩu');
          setOpenPopup(true);
          setIsLoading(false);
          console.log(err);
        }
      });
  };

  return (
    <div className='login-admin'>
      {isLoading ? <Loading isLoading={isLoading} /> : undefined}
      <div className='box-login-admin'>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Admin</h2>
        <div className='form-login'>
          <div style={{ marginBottom: '20px' }}>
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
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <button
            className='btn-login'
            onClick={handleSubmit(onSubmit)}
          >
            Đăng nhập
          </button>
        </div>
      </div>
      <div>
        <Dialog
          open={openPopup}
          onClose={handleClosePopup}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePopup}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Login;
