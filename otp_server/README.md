# otp_server

### Auth

* Send username and password in the HTTPS request
* All routes needs authentication (in order to unlock database)

### Routes

* Get a list of all accounts

```text
GET /api/v1/accounts 
{
	"meta": {
		"success": true
	},
	"data": [{
			"id": 0,
			"issuer": "Google",
			"name": "bastien.dhiver@epitech.eu",
			"otpType": "totp",
			"secret": "AZERT YUIOP QSDFG HJKLM WXCVB N1234 56789 0AZER",
			"fromBase32": true,
			"tokenLength": 6,
			"hashName": "sha1",
			"timeOffset": 0,
			"counter": 42
		},
		{
			"id": 1,
			"issuer": "Gitlab",
			"name": "bastien.dhiver@epitech.eu",
			"otpType": "totp",
			"secret": "azertyuiopqsdfghjklm",
			"fromBase32": false,
			"tokenLength": 8,
			"hashName": "sha512",
			"timeOffset": 0,
			"counter": 84
		}
	]
}
```

* Get account info via id

```text
GET /api/v1/accounts/:id
{
	"meta": {
		"success": true
	},
	"data": {
		"issuer": "Google",
		"name": "bastien.dhiver@epitech.eu",
		"otpType": "totp",
		"secret": "AZERT YUIOP QSDFG HJKLM WXCVB N1234 56789 0AZERT",
		"fromBase32": true,
		"tokenLength": 6,
		"hashName": "sha1",
		"timeOffset": 0,
		"counter": 42
	}
}
```

* Verify given token validity

```text
{
	"token": "123456"
}

GET /api/v1/accounts/:id/verifyToken
{
	"meta": {
		"success": true
	},
	"data": {
		"counterDelta" : -1
	}
}
{
	"meta": {
		"success": false
	}
	"data": null
}
```

* Create an account

If secret is not specified, generate a random one (20-byte)
```text
{
	"issuer": "Google",
	"name": "bastien.dhiver@epitech.eu",
	"otpType": "totp",
	"secret": "AZERT YUIOP QSDFG HJKLM WXCVB N1234 56789 0AZER",
	"fromBase32": true,
	"tokenLength": 6,
	"hashName": "sha1",
	"timeOffset": 0,
	"counter": 42
}

POST /api/v1/accounts
{
	"meta": {
		"success": true
	},
	"data": {
		"id": 42
	}
}
```

* Delete an entry

```text
DELETE /api/v1/accounts/:id
{
	"meta": {
		"success": true
	}
}
```

* Get Key Uri Format

```text
GET /api/v1/accounts/:id/keyUri
{
	"meta": {
		"success": true
	}
	"data": {
		"keyUri": "otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30"
	}
}
```
