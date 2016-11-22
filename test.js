let myotp = require('myotp')

secret = '12345678901234567890';
opt = {hashName: 'sha1', tokenLength: 6, fromBase32: false, counter: 3};

genTok = myotp.hotp.gen(secret, opt);
console.log('gen HOTP Tok nb', opt.counter, ':', genTok);
console.log(myotp.hotp.verify(secret, '359152', 10, opt));

console.log("===========================================================");

//secret = '3jbu ac6s huop ync3 s2o5 lofs ppqj xgv5';
secret = 'GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';
opt = {hashName: 'sha1', tokenLength: 8, fromBase32: true, secondsFromEpoch: 20000000000};

genTok = myotp.totp.gen(secret, opt);
console.log('gen TOTP Tok:', genTok);
console.log(myotp.totp.verify(secret, '02128202', 10, opt));
