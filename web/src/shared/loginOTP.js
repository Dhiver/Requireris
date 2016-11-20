import { FormGroup, FormControl, Validators } from '@angular/forms';
export var LoginOTP = (function () {
    function LoginOTP() {
        this.loginOTPForm = new FormGroup({
            account: new FormControl('', Validators.required),
            secretKey: new FormControl('', Validators.required),
            otpType: new FormControl("TOTP", Validators.required),
            counter: new FormControl(30, Validators.required),
            timeStart: new FormControl(0),
            length: new FormControl(6, Validators.required),
            hash: new FormControl("SHA-256", Validators.required)
        });
        this.otpType = "TOTP";
        this.googleMode = false;
    }
    LoginOTP.prototype.changeOTPtype = function (e) {
        switch (e.value) {
            case "HOTP":
                this.otpType = "HOTP";
                this.loginOTPForm.controls["otpType"].setValue("HOTP");
                this.loginOTPForm.controls["counter"].setValue(0);
                break;
            case "TOTP":
                this.otpType = "TOTP";
                this.loginOTPForm.controls["otpType"].setValue("TOTP");
                this.loginOTPForm.controls["counter"].setValue(30);
                break;
        }
    };
    LoginOTP.prototype.googleModeChange = function (e) {
        if (!e.checked) {
            return;
        }
        this.loginOTPForm.controls["otpType"].setValue("TOTP");
        this.otpType = "TOTP";
        this.loginOTPForm.controls["counter"].setValue(30);
        this.loginOTPForm.controls["timeStart"].setValue(0);
        this.loginOTPForm.controls["length"].setValue(6);
        this.loginOTPForm.controls["hash"].setValue("SHA-1");
    };
    LoginOTP.prototype.isGoogleMode = function () {
        return (this.loginOTPForm.controls["otpType"].value == "TOTP" &&
            this.loginOTPForm.controls["counter"].value == 30 &&
            this.loginOTPForm.controls["timeStart"].value == 0 &&
            this.loginOTPForm.controls["length"].value == 6 &&
            this.loginOTPForm.controls["hash"].value == "SHA-1");
    };
    return LoginOTP;
}());
//# sourceMappingURL=loginOTP.js.map