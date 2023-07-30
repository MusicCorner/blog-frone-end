import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { APISignUpPayload } from '@common/types/api/auth';
import { signUpSlice } from '@ducks/auth/auth.slices';
import { useAppSelector } from '@common/hooks/useAppSelector';
import { theme } from '@common/mui/theme';
import { useOnSuccessAuth } from '@common/hooks/useOnSuccessAuth';

export interface SignUpFormData extends APISignUpPayload {
  confirmPassword: string;
}

const defaultValues: SignUpFormData = {
  confirmPassword: '',
  firstName: '',
  lastName: '',
  email: '',
  login: '',
  password: '',
};

export const SignUpView = () => {
  const { control, handleSubmit, watch } = useForm<SignUpFormData>({
    defaultValues,
  });

  const dispatch = useDispatch();

  useOnSuccessAuth(signUpSlice.selectors.asyncState);

  const onSubmit = (data: SignUpFormData) => {
    dispatch(signUpSlice.actions.request(data));
  };

  const isProcessing = useAppSelector(signUpSlice.selectors.isProcessing);
  const { message: apiErrorMessage } =
    useAppSelector(signUpSlice.selectors.error) || {};

  const requiredMessage = 'This field is required';

  const passwordValue = watch('password');

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Grid item width={450}>
        <Card>
          <CardHeader title="Sign Up" />

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    rules={{ required: requiredMessage }}
                    name="firstName"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        sx={{ width: '100%' }}
                        placeholder="John"
                        type="text"
                        label="First Name"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Controller
                    rules={{ required: requiredMessage }}
                    name="lastName"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        sx={{ width: '100%' }}
                        placeholder="Doe"
                        type="text"
                        label="Last Name"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    rules={{ required: requiredMessage }}
                    name="login"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        sx={{ width: '100%' }}
                        placeholder="Enter your login"
                        type="text"
                        label="Login"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    rules={{
                      required: requiredMessage,
                      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    }}
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={
                          error?.type === 'pattern'
                            ? 'Email is invalid'
                            : error?.message
                        }
                        sx={{ width: '100%' }}
                        placeholder="Enter your email"
                        type="text"
                        label="Email"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    rules={{ required: requiredMessage }}
                    name="password"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={error?.message}
                        sx={{ width: '100%' }}
                        placeholder="Enter a secure password"
                        type="password"
                        label="Password"
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    rules={{
                      required: requiredMessage,
                      validate: (value) => value === passwordValue,
                    }}
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        error={!!error}
                        helperText={
                          error?.type === 'validate'
                            ? 'Passwords must be equal'
                            : error?.message
                        }
                        sx={{ width: '100%' }}
                        placeholder="Secure password x2"
                        type="password"
                        label="Confirm Password"
                      />
                    )}
                  />
                </Grid>

                <Grid container justifyContent="center" marginTop={2}>
                  <Grid item xs={6}>
                    <LoadingButton
                      sx={{ width: '100%' }}
                      variant="contained"
                      type="submit"
                      loading={isProcessing}
                    >
                      Sign Up
                    </LoadingButton>
                  </Grid>

                  {apiErrorMessage && (
                    <Grid item xs={12} justifyContent="center" marginTop={2}>
                      <Typography
                        textAlign="center"
                        color={theme.palette.error.main}
                      >
                        {apiErrorMessage}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
