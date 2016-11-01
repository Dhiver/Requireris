import {Observable} from 'rxjs/Rx';

export class OTP {
    timeLeft: number;
    otp: number;
    timeSubscribe: any;

    constructor(public account: string, public secretKey: string, public validity: number, public lengh: number) {
        this.timeLeft = validity;
        this.genOTP();
        this.timeSubscribe = Observable.interval(1000).map((x) => {
            this.timeLeft -= 1;
        }).subscribe((x) => {
            if (this.timeLeft <= 0) {
                this.timeLeft = this.validity;
                this.genOTP();
            }
        });
    }

    genOTP(): void {
        this.otp = Math.floor(100000 + Math.random() * 900000);
    }

    getTimeLeftPercent(): number {
        return this.timeLeft / this.validity * 100;
    }
}
