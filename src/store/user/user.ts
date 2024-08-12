import {createSlice} from '@reduxjs/toolkit';

import {AuthorizationStatus, NameSpace, RequestStatus} from '@/constants';
import {ErrorDetail, LoginError, UserData} from '@/types';
import {checkAuth, login, logout} from '@/store/user/api-actions';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  requestStatus: RequestStatus;
  loginResponseErrors: string[];
  user: UserData | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  requestStatus: RequestStatus.Idle,
  loginResponseErrors: [],
  user: null,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, {payload}) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.user = payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(login.pending, (state) => {
        state.requestStatus = RequestStatus.Pending;
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.requestStatus = RequestStatus.Success;
        state.user = payload as UserData;
      })
      .addCase(login.rejected, (state, {payload}) => {
        const error = payload as LoginError;
        if (error?.details) {
          state.loginResponseErrors = error.details.reduce((acc: string[], detail: ErrorDetail) => {
            acc.push(detail.messages.join('; '));
            return acc;
          }, []);
        }
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = null;
      });
  }
});

