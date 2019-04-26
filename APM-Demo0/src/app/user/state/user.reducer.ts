import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';
import { UserActions, UserActionTypes } from './user.actions';

export interface UserState {
    maskUsername: boolean;
    currentUser: User;
}

const initialState: UserState = {
    maskUsername: false,
    currentUser: null
};

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUsername = createSelector(
    getUserFeatureState,
    state => state.maskUsername
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export function userReducer(state = initialState, action: UserActions): UserState {
    console.log('User Reducer');
    switch (action.type) {
        case UserActionTypes.MaskUsername:
            console.log('existing state:', JSON.stringify(state));
            console.log('payload: ' + action.payload);
            return { ...state, maskUsername: action.payload };
        default:
            return state;
    }
}
