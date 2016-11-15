# TODO

- [x] Implement HOTP
- [x] Implement TOTP

## Bonus

- [ ] Dhiver
	- [ ] Server API
		- [ ] HTTPS
		- [ ] Encrypted DB
		- [ ] Validation
		- [ ] Throttling
		- [ ] Resynchronization
		- [ ] Shared secret generation
			- [ ] Deterministic
			- [ ] Random
		- [ ] Bi-Directional Authentication
		- [x] Generate Key Uri for QRCode
	- [ ] Client
		- [ ] Generate image
- [ ] Wery
	- [ ] Features
		- [x] HTTPS
		- [x] QR Code generator
		- [x] account
			- [x] multi
			- [x] remove
			- [x] TOTP / HOTP
			- [x] SHA1 / SHA-256 / SHA-512
			- [x] Validity / Start / Length
			- [x] Google Mode Compatibility
		- [x] Authenfication
			- [x] None
			- [x] auth by user / login
				- [x] cryptedDB
				- [x] import / export from DB
				- [x] auth by user / login
		- [x] unlock by pin
		- [x] localStorage
		- [x] chiffer password and localStorage
		- [x] login add ip from database (or direct server)
		- [ ] fix CORS
	- [x] Web Interface / Electron App
		- [x] Angular2
		- [x] Electron
		- [x] Beautiful Interface
		- [x] Responsive Design
		- [x] show QR Code
		- [x] OTP to clipboard
	- [ ] Android / iOS App
		- [x] NativeScript
		- [x] Angular2
		- [ ] use DB in device ???

## SuperBonus
- [ ] webOS App
- [ ] send by SMS
- [ ] PAM Module
- [ ] Pebble
