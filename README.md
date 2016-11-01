# HOTP (HMAC-Based One-Time Password)

* HOTP algorithm is based on an increasing counter value and a static symmetric key known only to the token and the validation service.
* HOTP algorithm compute an HMAC-SHA-1 value and truncate it.

## Input

* HOTP value must be at least 6-digit value up to 8.
* HOTP value 'numeric only'.
* strong shared secret must be at least 128 bits (160 bits recommended).
* The 8-byte counter value must be synchronised between the HOTP generator (client) and the HOTP validator (server).

## Generate HOTP Values

* As the output of the HMAC-SHA-1 calculation is 160 bits, we must truncate this value to something that can be easily entered by a user.

* HOTP(K,C) = Truncate(HMAC-SHA-1(K,C)) // The Key (K), the Counter (C)
* Truncate represents the function that converts an HMAC-SHA-1 value into an HOTP value.

## Validation of HOTP Values

* The HOTP client (hardware or software token) increments its counter and then calculates the next HOTP value HOTP client.  If the value received by the authentication server matches the value calculated by the client, then the HOTP value is validated.  In this case, the server increments the counter value by one.
* If the value received by the server does not match the value calculated by the client, the server initiate the resynch protocol (look-ahead window) before it requests another pass.
* If the resynch fails, the server asks then for another authentication pass of the protocol to take place, until the maximum number of authorized attempts is reached.
* the server will refuse connections from a user after n unsuccessful authentication attemps. Server should lock out the account and initiate a procedure to inform the user.

## Throttling at the Server

* Truncating the HMAC-SHA-1 value to a shorter value makes a brute force attack possible. Therefore, the authentication server needs to detect and stop brute force attacks.
* We RECOMMEND setting a throttling parameter T, which defines the maximum number of possible attempts for One-Time Password validation. The validation server manages individual counters per HOTP device in order to take note of any failed attempt.  We RECOMMEND T not to be too large, particularly if the resynchronization method used on the server is window-based, and the window size is large.  T SHOULD be set as low as possible, while still ensuring that usability is not significantly impacted.
* Another option would be to implement a delay scheme to avoid a brute force attack.  After each failed attempt A, the authentication server would wait for an increased T times A number of seconds, e.g., say T = 5, then after 1 attempt, the server waits for 5 seconds, at the second failed attempt, it waits for 5 times 2 = 10 seconds, etc. 
* The delay or lockout schemes MUST be across login sessions to prevent attacks based on multiple parallel guessing techniques.

## Resynchronization of the Counter

* Although the server's counter value is only incremented after a successful HOTP authentication, the counter on the token is incremented every time a new HOTP is requested by the user.  Because of this, the counter values on the server and on the token might be out of synchronization.
* We RECOMMEND setting a look-ahead parameter s on the server, which defines the size of the look-ahead window.  In a nutshell, the server can recalculate the next s HOTP-server values, and check them against the received HOTP client.
* Synchronization of counters in this scenario simply requires the server to calculate the next HOTP values and determine if there is a match.  Optionally, the system MAY require the user to send a sequence of (say, 2, 3) HOTP values for resynchronization purpose, since forging a sequence of consecutive HOTP values is even more difficult than guessing a single HOTP value.
* The upper bound set by the parameter s ensures the server does not go on checking HOTP values forever (causing a denial-of-service attack) and also restricts the space of possible solutions for an attacker trying to manufacture HOTP values. s SHOULD be set as low as possible, while still ensuring that usability is not impacted.
