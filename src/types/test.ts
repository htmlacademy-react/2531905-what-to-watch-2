import {Action, ThunkDispatch} from '@reduxjs/toolkit';
import {State} from '@/types/state';
import {createAPI} from '@/services/api';
import {RouterType} from '@/router';

export type AppThunkDispatch = ThunkDispatch<State, {api: ReturnType<typeof createAPI>; router: RouterType}, Action>;
