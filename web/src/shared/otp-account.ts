import {Observable} from 'rxjs/Rx';

import { OTP } from './otp';

export interface Secret {
    account: string
    secret: string
    movingFactor: number
    length: number
    otpType: string
    hashType: string
}

export class OTPAccount {
    counter: number;
    OTPtoken: string;
    OTPKeyURI: string;
    timeSubscribe: any;
    timeStart: number;
    otp: OTP;
    showQrCode: boolean = false;

    constructor(
        public account: string,
        private secret: string,
        private otpType: string,
        private movingFactor: number,
        private length: number,
        private hash: string,
        timeStart?: number) {
            this.timeStart = timeStart || 0;
            this.otp = new OTP(secret, length, hash);
            this.otp.genCommonURI("DHIWERY Inc.", this.account);
            this.counter = this.movingFactor;
            switch(this.otpType) {
                case "HOTP":
                    break;
                case "TOTP":
                    this.initTOTP();
                    break;
            }
            this.genOTP();
        }

        getTimeLeftPercent(): number {
            if (this.otpType == "HOTP") {
                return 100;
            }
            return Math.round(this.counter / this.movingFactor * 100);
        }

        genOTP(): void {
            try {
                switch(this.otpType) {
                    case "HOTP":
                        this.OTPKeyURI = this.otp.genHOTPKeyURI(this.counter);
                        this.OTPtoken = this.otp.hotp(this.counter);
                        break;
                    case "TOTP":
                        this.OTPKeyURI = this.otp.genTOTPKeyURI(this.movingFactor);
                        this.OTPtoken = this.otp.totp(this.movingFactor, this.timeStart);
                        break;
                }
            } catch (e) {
                console.error(e);
            }
        }

        updateCounter() {
            if (this.otpType == "HOTP") {
                this.counter++;
                this.genOTP();
            }
        }

        initTOTP() {
            this.timeSubscribe = Observable.interval(1000).map((x) => {
                this.counter -= 1;
            }).subscribe((x) => {
                if (this.counter <= 0) {
                    this.counter = this.movingFactor;
                    this.genOTP();
                }
            });
        }

        toggleQrCode(): void {
            this.showQrCode = !this.showQrCode;
        }

        getData(): Secret {
            return {
                account: this.account,
                secret: this.secret,
                movingFactor: this.movingFactor,
                length: this.length,
                otpType: this.otpType,
                hashType: this.hash
            };
        }
    }
