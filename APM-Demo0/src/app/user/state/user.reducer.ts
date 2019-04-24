import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../user';

export interface UserState {
    maskUsername: boolean;
    currentUser: User;
}

const initialState: UserState = {
    maskUsername: false,
    currentUser: null
};

export interface UserAction {
    type: string;
    payload: boolean;
}

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUsername = createSelector(
    getUserFeatureState,
    state => state.maskUsername
);

export const getCurrentUser = createSelector(
    getUserFeatureState,
    state => state.currentUser
);

export function userReducer(state = initialState, action: UserAction): UserState {
    console.log('User Reducer');
    switch (action.type) {
        case 'TOGGLE_MASK':
            console.log('existing state:', JSON.stringify(state));
            console.log('payload: ' + action.payload);
            return {
                ...state,
                maskUsername: action.payload
            };
        default:
            return state;
    }
}
