import { Action } from '@ngrx/store';

export enum UserActionTypes {
    MaskUsername = '[User]  Mask Username'
}

export class MaskUsername implements Action {
    readonly type = UserActionTypes.MaskUsername;
    constructor(public payload: boolean) {}
}

export type UserActions = MaskUsername;
