import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';

import * as fromActions from '../actions';
import * as fromUser from './user.reducer';

export interface AppState {
  user: fromUser.IUserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
};

export function clearState(reducer) {
  return function (state, action) {
    if (action.type === fromActions.LOGOUT) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const getUserState = createFeatureSelector<fromUser.IUserState>('user');
