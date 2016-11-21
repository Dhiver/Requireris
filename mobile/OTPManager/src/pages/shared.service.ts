import { EventEmitter }  from '@angular/core';

import { OTPAccount } from '../shared/otp-account';

export class Shared {
    public newAccount: EventEmitter<OTPAccount> = new EventEmitter<OTPAccount>();
    public serverAddress: EventEmitter<string> = new EventEmitter<string>();
}
