/// <reference path="./jssha.d.ts"/>

import { Buffer } from 'buffer';
import { Base32 } from './base32';

import * as jsSHA from 'jssha';

export class OTP {

    private avaibleHash: string[] = ['SHA-1', 'SHA-256', 'SHA-512'];

    private commonURI: string;
    private issuer: string;
    private account: string;

    constructor(
        private secret: string,
        private length: number,
        private hash: string) {
            this.length = this.length < 6 ? 6 : this.length;
            this.length = this.length > 8 ? 8 : this.length;
        }

        private hmac(hash: string, secret: Buffer, msg: string): any {
            let shaObj = new jsSHA(hash, "HEX");
            shaObj.setHMACKey(secret.toString("hex"), "HEX");
            shaObj.update(msg);
            return new Buffer(shaObj.getHMAC("HEX"), "hex");
        }

        private getBufferSubset(buf, offset, length) {
            return new Buffer(buf).slice(offset, offset + length);
        }

        private dynamicTruncation(hs: Buffer): number {
            // Get offset value from the hs last byte low-order nibble
            const offset = hs[hs.length - 1] & 0xf;
            // Only get 4-byte from hs at offset
            const dbc1 = this.getBufferSubset(hs, offset, 4);
            let dbc2 = new Buffer(dbc1);
            // Masking the most significant bit of dbc2
            dbc2[0] &= 0x7f;
            return dbc2.readUIntBE(0, dbc2.length);
        }

        public hotp(movingFactor: number) {
            assert(this.secret.length >= 16, "shared secret must be at least 16 bytes");
            assert(this.avaibleHash.indexOf(this.hash) != -1, "wrong hash name");

            const counter: Buffer = Buffer.alloc(8);
            counter.writeUIntBE(movingFactor, 0, 8);

            const decodedSecret: Buffer = (new Base32()).decode(this.secret.replace(/\W+/g, ''));
            const hs: Buffer = this.hmac(this.hash, decodedSecret, counter.toString('hex'));
            const sbits: string = this.dynamicTruncation(hs).toString();
            return sbits.substr(sbits.length - this.length);
        }

        public totp(timeStep?: number, timeStart?: number) {
            const secondsFromEpoch: number = Math.floor((new Date).getTime() / 1000);
            const movingFactor: number = Math.floor((secondsFromEpoch - ((timeStart || 0))) / (timeStep || 30));
            return this.hotp(movingFactor);
        }

        public genCommonURI(issuer: string, account: string): void {
            this.issuer = issuer;
            this.account = account;
            this.commonURI = '/' + encodeURI(this.issuer) + ':' + encodeURI(this.account)
            + '?secret=' + encodeURIComponent(this.secret.replace(/\W+/g, '').toUpperCase())
            + '&issuer=' + encodeURIComponent(this.issuer)
            + '&algorithm=' + this.hash.replace('-', '')
            + '&digits=' + (this.length);
        }

        public genHOTPKeyURI(counter?: number) {
            return "otpauth://hotp" + this.commonURI + '&counter=' + (counter || 0);
        }

        public genTOTPKeyURI(period?: number) {
            return "otpauth://totp" + this.commonURI + '&period=' + (period || 30);
        }

    }
