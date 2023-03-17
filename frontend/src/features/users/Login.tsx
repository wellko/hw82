import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LoginMutation } from '../../types';
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { FBLogin, googleLogin, login } from './UsersThunks';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoginError, selectLoginLoading } from './UsersSlice';
import { GoogleLogin } from '@react-oauth/google';
import { FB_CLIENT_ID } from '../../constants';
import FacebookLogin, { ProfileSuccessResponse } from '@greatsumini/react-facebook-login';

const Login = () => {
  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(login(state)).unwrap();
    navigate('/');
  };

  const googleLoginHandler = async (credential: string) => {
    await dispatch(googleLogin(credential)).unwrap();
    navigate('/');
  };

  const FBLoginHandler = async (arg: ProfileSuccessResponse) => {
    await dispatch(FBLogin(arg)).unwrap();
    navigate('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid container item xs={12}>
              <TextField
                sx={{ margin: 'auto' }}
                label="Username"
                name="username"
                autoComplete="current-username"
                value={state.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid container item xs={12}>
              <TextField
                sx={{ margin: 'auto' }}
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? <CircularProgress /> : 'Sign In'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                Or sign up
              </Link>
            </Grid>
          </Grid>
          <Grid item sx={{ pt: 5 }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  void googleLoginHandler(credentialResponse.credential);
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
            <FacebookLogin
              appId={FB_CLIENT_ID}
              onFail={(error) => {
                console.log('Login Failed!', error);
              }}
              onProfileSuccess={(response) => {
                void FBLoginHandler(response);
                console.log(response);
              }}
              style={{
                backgroundColor: '#4267b2',
                color: '#fff',
                fontSize: '16px',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
              }}
            />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
