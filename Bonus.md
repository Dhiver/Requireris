* webApp
    * HTTPS
    * Auto-lock PIN
    * Cipher localStorage
    * Account
        * multi
        * remove
        * Configurable
            * TOTP / HOTP
        	* SHA1 / SHA-256 / SHA-512
        	* Validity / Start / Length
        	* Google Mode Compatibility
        * QR Code Generator
        * Copy to Clipboard
    * Connect to Server
    * Responsive Design
    * Quick and Secure access
* mobileApp
    * Account
        * multi
        * remove
        * Configurable
            * TOTP / HOTP
            * SHA1 / SHA-256 / SHA-512
            * Validity / Start / Length
            * Google Mode Compatibility
        * QR Code Scanner
        * Connect to Server
* Common webApp / mobileApp
    * Reimplementation of base32 (thirty-two) for angular2
    * recode of TOTP /HOTP in pure JS (web) no nodeJS
    * Abstraction of OTPManager, LoginOTP
* Server
    * HTTPS / TLS
    * Serve website and direct access to databases
    * accounts
        * cihper database
        * password hash (bcrypt) in database
        * sign_in
        * sign_up
    * Secrets
        * cipher database for each user
        * add
        * remove
        * list

* Online WebApp
* Binaries
    * Linux 32 / 64 bits
        * AppImage
        * Deb
        * RPM
        * FreeBSD
        * 7z
        * zip
        * tar.xz
        * tar.lz
        * tar.gz
        * tar.bz2
    * Windows 32 / 64 bits
        * exe
        * msi
        * zip
    * MacOS
        * dmg
        * pkg
    * Android
        * apk
    * iOS (not build)
    * Windows Universal Apps (not build)
