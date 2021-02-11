import {createSelector} from '@ngrx/store';
import * as fromRoot from '../reducers';

export const getIsLogged = createSelector(
  fromRoot.getUserState,
  (state) => state.isLogged
);

export const getIsInit = createSelector(
  fromRoot.getUserState,
  (state) => state.init
);

export const getUserData = () => createSelector(
  fromRoot.getUserState,
  (state) => state.user
);

export const getLoading = createSelector(
  fromRoot.getUserState,
  (state) => state.loading
);

export const getMessageAuth = createSelector(
  fromRoot.getUserState,
  (state) => state.message
);

export const getUser = createSelector(
  fromRoot.getUserState,
  (state) => state.user
);
