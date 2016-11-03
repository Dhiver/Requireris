export class Base32 {
    BASE32_ENCODE_CHAR: any;
    BASE32_DECODE_CHAR: any;
    blocks: any;

    constructor() {
        this.BASE32_ENCODE_CHAR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'.split('');
        this.BASE32_DECODE_CHAR = {
            'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8,
            'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16,
            'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24,
            'Z': 25, '2': 26, '3': 27, '4': 28, '5': 29, '6': 30, '7': 31
        };

        this.blocks = [0, 0, 0, 0, 0, 0, 0, 0];
    }


    toUtf8String(bytes) {
        var str = '', length = bytes.length, i = 0, followingChars = 0, b, c;
        while(i < length) {
            b = bytes[i++];
            if(b <= 0x7F) {
                str += String.fromCharCode(b);
                continue;
            } else if(b > 0xBF && b <= 0xDF) {
                c = b & 0x1F;
                followingChars = 1;
            } else if(b <= 0xEF) {
                c = b & 0x0F;
                followingChars = 2;
            } else if(b <= 0xF7) {
                c = b & 0x07;
                followingChars = 3;
            } else {
                throw 'not a UTF-8 string';
            }

            for(var j = 0;j < followingChars;++j) {
                b = bytes[i++];
                if (b < 0x80 || b > 0xBF) {
                    throw 'not a UTF-8 string';
                }
                c <<= 6;
                c += b & 0x3F;
            }
            if (c >= 0xD800 && c <= 0xDFFF) {
                throw 'not a UTF-8 string';
            }
            if (c > 0x10FFFF) {
                throw 'not a UTF-8 string';
            }

            if (c <= 0xFFFF) {
                str += String.fromCharCode(c);
            } else {
                c -= 0x10000;
                str += String.fromCharCode((c >> 10) + 0xD800);
                str += String.fromCharCode((c & 0x3FF) + 0xDC00);
            }
        }
        return str;
    };

    decodeAsBytes(base32Str) {
        base32Str = base32Str.replace(/=/g, '');
        var v1, v2, v3, v4, v5, v6, v7, v8, bytes = [], index = 0, length = base32Str.length;

        // 4 char to 3 bytes
        for(var i = 0, count = length >> 3 << 3;i < count;) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v5 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v6 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v7 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v8 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
            bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
            bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
            bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
            bytes[index++] = (v7 << 5 | v8) & 255;
        }

        // remain bytes
        var remain = length - count;
        if(remain == 2) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
        } else if(remain == 4) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
            bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
        } else if(remain == 5) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v5 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
            bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
            bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
        } else if(remain == 7) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v5 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v6 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v7 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            bytes[index++] = (v1 << 3 | v2 >>> 2) & 255;
            bytes[index++] = (v2 << 6 | v3 << 1 | v4 >>> 4) & 255;
            bytes[index++] = (v4 << 4 | v5 >>> 1) & 255;
            bytes[index++] = (v5 << 7 | v6 << 2 | v7 >>> 3) & 255;
        }
        return bytes;
    };

    encodeAscii(str) {
        var v1, v2, v3, v4, v5, base32Str = '', length = str.length;
        for(var i = 0, count = length / 5 * 5;i < count;) {
            v1 = str.charCodeAt(i++);
            v2 = str.charCodeAt(i++);
            v3 = str.charCodeAt(i++);
            v4 = str.charCodeAt(i++);
            v5 = str.charCodeAt(i++);
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
            this.BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
            this.BASE32_ENCODE_CHAR[v5 & 31];
        }

        // remain char
        var remain = length - count;
        if(remain == 1) {
            v1 = str.charCodeAt(i);
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
            '======';
        } else if(remain == 2) {
            v1 = str.charCodeAt(i++);
            v2 = str.charCodeAt(i);
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
            '====';
        } else if(remain == 3) {
            v1 = str.charCodeAt(i++);
            v2 = str.charCodeAt(i++);
            v3 = str.charCodeAt(i);
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
            this.BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
            '===';
        } else if(remain == 4) {
            v1 = str.charCodeAt(i++);
            v2 = str.charCodeAt(i++);
            v3 = str.charCodeAt(i++);
            v4 = str.charCodeAt(i);
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
            this.BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
            '=';
        }
        return base32Str;
    };

    encodeUtf8(str) {
        var v1, v2, v3, v4, v5, code, end = false, base32Str = '',
        index = 0, i, start = 0, bytes = 0, length = str.length;
        do {
            this.blocks[0] = this.blocks[5];
            this.blocks[1] = this.blocks[6];
            this.blocks[2] = this.blocks[7];
            for (i = start;index < length && i < 5; ++index) {
                code = str.charCodeAt(index);
                if (code < 0x80) {
                    this.blocks[i++] = code;
                } else if (code < 0x800) {
                    this.blocks[i++] = 0xc0 | (code >> 6);
                    this.blocks[i++] = 0x80 | (code & 0x3f);
                } else if (code < 0xd800 || code >= 0xe000) {
                    this.blocks[i++] = 0xe0 | (code >> 12);
                    this.blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
                    this.blocks[i++] = 0x80 | (code & 0x3f);
                } else {
                    code = 0x10000 + (((code & 0x3ff) << 10) | (str.charCodeAt(++index) & 0x3ff));
                    this.blocks[i++] = 0xf0 | (code >> 18);
                    this.blocks[i++] = 0x80 | ((code >> 12) & 0x3f);
                    this.blocks[i++] = 0x80 | ((code >> 6) & 0x3f);
                    this.blocks[i++] = 0x80 | (code & 0x3f);
                }
            }
            bytes += i - start;
            start = i - 5;
            if(index == length) {
                ++index;
            }
            if(index > length && i < 6) {
                end = true;
            }
            v1 = this.blocks[0];
            if(i > 4) {
                v2 = this.blocks[1];
                v3 = this.blocks[2];
                v4 = this.blocks[3];
                v5 = this.blocks[4];
                base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
                this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
                this.BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
                this.BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
                this.BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
                this.BASE32_ENCODE_CHAR[v5 & 31];
            } else if(i == 1) {
                base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
                this.BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
                '======';
            } else if(i == 2) {
                v2 = this.blocks[1];
                base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
                this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
                '====';
            } else if(i == 3) {
                v2 = this.blocks[1];
                v3 = this.blocks[2];
                base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
                this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
                this.BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
                '===';
            } else if(i == 4) {
                v2 = this.blocks[1];
                v3 = this.blocks[2];
                v4 = this.blocks[3];
                base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
                this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
                this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
                this.BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
                this.BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
                this.BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
                '=';
            }
        } while(!end);
        return base32Str;
    };

    encodeBytes(bytes) {
        var v1, v2, v3, v4, v5, base32Str = '', length = bytes.length;
        for(var i = 0, count = length / 5 * 5;i < count;) {
            v1 = bytes[i++];
            v2 = bytes[i++];
            v3 = bytes[i++];
            v4 = bytes[i++];
            v5 = bytes[i++];
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
            this.BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 << 3 | v5 >>> 5) & 31] +
            this.BASE32_ENCODE_CHAR[v5 & 31];
        }

        // remain char
        var remain = length - count;
        if(remain == 1) {
            v1 = bytes[i];
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2) & 31] +
            '======';
        } else if(remain == 2) {
            v1 = bytes[i++];
            v2 = bytes[i];
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4) & 31] +
            '====';
        } else if(remain == 3) {
            v1 = bytes[i++];
            v2 = bytes[i++];
            v3 = bytes[i];
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
            this.BASE32_ENCODE_CHAR[(v3 << 1) & 31] +
            '===';
        } else if(remain == 4) {
            v1 = bytes[i++];
            v2 = bytes[i++];
            v3 = bytes[i++];
            v4 = bytes[i];
            base32Str += this.BASE32_ENCODE_CHAR[v1 >>> 3] +
            this.BASE32_ENCODE_CHAR[(v1 << 2 | v2 >>> 6) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 >>> 1) & 31] +
            this.BASE32_ENCODE_CHAR[(v2 << 4 | v3 >>> 4) & 31] +
            this.BASE32_ENCODE_CHAR[(v3 << 1 | v4 >>> 7) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 >>> 2) & 31] +
            this.BASE32_ENCODE_CHAR[(v4 << 3) & 31] +
            '=';
        }
        return base32Str;
    };

    encode(input, asciiOnly) {
        var notString = typeof(input) != 'string';
        if(notString && input.constructor == ArrayBuffer) {
            input = new Uint8Array(input);
        }
        if(notString) {
            return this.encodeBytes(input);
        } else if(asciiOnly) {
            return this.encodeAscii(input);
        } else {
            return this.encodeUtf8(input);
        }
    };

    decode(base32Str: string, asciiOnly: boolean): string {
        if(!asciiOnly) {
            return this.toUtf8String(this.decodeAsBytes(base32Str));
        }
        var v1, v2, v3, v4, v5, v6, v7, v8, str = '', length = base32Str.indexOf('=');
        if(length == -1) {
            length = base32Str.length;
        }

        // 8 char to 5 bytes
        for(var i = 0, count = length >> 3 << 3;i < count;) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v5 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v6 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v7 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v8 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
            String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) +
            String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) +
            String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255) +
            String.fromCharCode((v7 << 5 | v8) & 255);
        }

        // remain bytes
        var remain = length - count;
        if(remain == 2) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255);
        } else if(remain == 4) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
            String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255);
        } else if(remain == 5) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v5 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
            String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) +
            String.fromCharCode((v4 << 4 | v5 >>> 1) & 255);
        } else if(remain == 7) {
            v1 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v2 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v3 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v4 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v5 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v6 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            v7 = this.BASE32_DECODE_CHAR[base32Str.charAt(i++)];
            str += String.fromCharCode((v1 << 3 | v2 >>> 2) & 255) +
            String.fromCharCode((v2 << 6 | v3 << 1 | v4 >>> 4) & 255) +
            String.fromCharCode((v4 << 4 | v5 >>> 1) & 255) +
            String.fromCharCode((v5 << 7 | v6 << 2 | v7 >>> 3) & 255);
        }
        return str;
    };

}
