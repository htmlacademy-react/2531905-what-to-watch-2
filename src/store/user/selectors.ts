import {State} from '@/types/state';
import {AuthorizationStatus, NameSpace, RequestStatus} from '@/constants';
import {UserData} from '@/types';

export const getIsUserAuthorized = (state: Pick<State, NameSpace.User>): boolean => (
  Boolean(state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth && state[NameSpace.User].user && state[NameSpace.User].user.token.length > 0)
);
export const getRequestStatus = (state: Pick<State, NameSpace.User>): RequestStatus => state[NameSpace.User].requestStatus;
export const getLoginResponseErrors = (state: Pick<State, NameSpace.User>): string[] => state[NameSpace.User].loginResponseErrors;
export const getUser = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].user;
