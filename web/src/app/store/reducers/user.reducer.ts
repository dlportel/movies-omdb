import * as fromActions from '../actions';
import {IUser} from '../../core/models/user.model';
import {cloneDeep} from 'lodash-es';

export interface IUserState {
  user: IUser;
  isLogged: boolean;
  loading: boolean;
  message: string;
  error: any;
  init: boolean;
}

export const initialAuthState: IUserState = {
  user: null,
  isLogged: false,
  loading: false,
  message: null,
  error: null,
  init: false,
};

export function reducer(state = initialAuthState, action: fromActions.AuthActions) {
  switch (action.type) {
    case fromActions.KEEP_LOGIN: {
      return {
        ...state,
      };
    }
    case fromActions.LOGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.LOGIN_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        isLogged: true,
        loading: false,
        init: true,
        user,
      };
    }
    case fromActions.LOGIN_FAIL: {
      return {
        ...state,
        isLogged: false,
        loading: false,
        init: true,
        error: action.payload
      };
    }
    case fromActions.LOGOUT: {
      return {
        ...state,
        isLogged: false,
        loading: false,
      };
    }
    case fromActions.FAVORITE: {
      return {
        ...state,
        loading: true
      };
    }
    case fromActions.FAVORITE_SUCCESS: {
      const user = cloneDeep(state.user);
      user.favorites = action.payload;
      return {
        ...state,
        user,
        loading: false,
      };
    }
    case fromActions.FAVORITE_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
  }
  return state;
}
