# TODO

- [x] Implement HOTP
- [x] Implement TOTP

## Bonus

- [ ] Dhiver
	- [ ] Develop a server side token verification program
		- [ ] Validation
		- [ ] Throttling
		- [ ] Resynchronization
		- [ ] Shared secret generation
			- [ ] Deterministic
			- [ ] Random
		- [ ] Bi-Directional Authentication
	- [ ] Create a PAM module with this server program
	- [x] Generate Key Uri for QRCode
- [ ] Wery
	- [x] QR Code generator
	- [x] no AuthAccount => empty
	- [x] multi account
	- [x] remove account
    - [ ] AuthAccount
        - [x] crytped DB
        - [ ] auth by user / login
        - [ ] auth by Google
        - [ ] auth by Facebook
        - [ ] auth by Yammer ???
	- [ ] compatibilty mode (ex: Google)


- [ ] Web Interface / Electron App
	- [x] Angular2
	- [x] REVOIR INTERFACE
	- [ ] show QR Code
	- [x] HOTP / TOTP
		- [x] change form login
		- [x] change table cell

- [ ] Android / iOS App
	- [x] NativeScript
	- [x] Angular2
	- [ ] unlock by PIN code
	- [ ] use DB in device ???

## SuperBonus
- [ ] webOS App
- [ ] send by SMS
- [ ] PAM Module
- [ ] Pebble
