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

import { APILoginPayload } from '@common/types/api/auth';
import { loginSlice } from '@ducks/auth/auth.slices';
import { useAppSelector } from '@common/hooks/useAppSelector';
import { theme } from '@common/mui/theme';
import { useOnSuccessAuth } from '@common/hooks/useOnSuccessAuth';

const defaultValues: APILoginPayload = {
  login: '',
  password: '',
};

export const SignInView = () => {
  const { control, handleSubmit } = useForm<APILoginPayload>({
    defaultValues,
  });

  useOnSuccessAuth(loginSlice.selectors.asyncState);

  const dispatch = useDispatch();

  const onSubmit = (data: APILoginPayload) => {
    dispatch(loginSlice.actions.request(data));
  };

  const isProcessing = useAppSelector(loginSlice.selectors.isProcessing);
  const { message: apiErrorMessage } =
    useAppSelector(loginSlice.selectors.error) || {};

  const requiredMessage = 'This field is required';

  return (
    <Grid container justifyContent="center" alignItems="center" height="100%">
      <Grid item width={450}>
        <Card>
          <CardHeader title="Sign In" />

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
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

                <Grid container justifyContent="center" marginTop={2}>
                  <Grid item xs={6}>
                    <LoadingButton
                      sx={{ width: '100%' }}
                      variant="contained"
                      type="submit"
                      loading={isProcessing}
                    >
                      Sign In
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
