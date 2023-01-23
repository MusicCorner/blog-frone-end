import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@common/constants/routes';
import { SignUpView } from '@views/SignUp';
import { HomeView } from '@views/Home';

export const RootRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path={ROUTES.SIGN_UP} element={<SignUpView />} />

        <Route index path={ROUTES.HOME} element={<HomeView />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
