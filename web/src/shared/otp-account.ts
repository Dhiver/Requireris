import {Observable} from 'rxjs/Rx';

import { OTP } from './otp';

export class OTPAccount {
    timeLeft: number;
    OTPtoken: string;
    timeSubscribe: any;
    otp: OTP;

    constructor(
        public account: string,
        private secret: string,
        private timeStep: number,
        private length: number) {
             this.otp = new OTP(secret, length, "SHA-512");
            this.timeLeft = timeStep;
            this.genOTP();
            this.timeSubscribe = Observable.interval(1000).map((x) => {
                this.timeLeft -= 1;
            }).subscribe((x) => {
                if (this.timeLeft <= 0) {
                    this.timeLeft = this.timeStep;
                    this.genOTP();
                }
            });
        }

        getTimeLeftPercent(): number {
            return this.timeLeft / this.timeStep * 100;
        }

        genOTP(): void {
            try {
                this.OTPtoken = this.otp.totp(this.timeStep)
            } catch (e) {
                console.error(e);
            }
        }
    }
