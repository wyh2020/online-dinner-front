/**
 * Created with wyh.
 * Date: 2018/3/31
 * Time: 下午11:55
 */


const BigIntUtil = {};


let maxDigits;
let ZERO_ARRAY;
let bigZero;
let bigOne;

function BigInt(flag) {
  if (typeof flag === 'boolean' && flag == true) {
    this.digits = null;
  } else {
    this.digits = ZERO_ARRAY.slice(0);
  }
  this.isNeg = false;
}

function biFromHex(s) {
  const result = new BigInt();
  const sl = s.length;
  for (let i = sl, j = 0; i > 0; i -= 4, ++j) {
    result.digits[j] = hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
  }
  return result;
}

function hexToDigit(s) {
  let result = 0;
  const sl = Math.min(s.length, 4);
  for (let i = 0; i < sl; ++i) {
    result <<= 4;
    result |= charToHex(s.charCodeAt(i));
  }
  return result;
}

function charToHex(c) {
  const ZERO = 48;
  const NINE = ZERO + 9;
  const littleA = 97;
  const littleZ = littleA + 25;
  const bigA = 65;
  const bigZ = 65 + 25;
  let result;

  if (c >= ZERO && c <= NINE) {
    result = c - ZERO;
  } else if (c >= bigA && c <= bigZ) {
    result = 10 + c - bigA;
  } else if (c >= littleA && c <= littleZ) {
    result = 10 + c - littleA;
  } else {
    result = 0;
  }
  return result;
}

function biHighIndex(x) {
  let result = x.digits.length - 1;
  while (result > 0 && x.digits[result] == 0) --result;
  return result;
}

function BarrettMu(m) {
  this.modulus = biCopy(m);
  this.k = biHighIndex(this.modulus) + 1;
  var b2k = new BigInt();
  b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
  this.mu = biDivide(b2k, this.modulus);
  this.bkplus1 = new BigInt();
  this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
  this.modulo = BarrettMu_modulo;
  this.multiplyMod = BarrettMu_multiplyMod;
  this.powMod = BarrettMu_powMod;
}

function BarrettMu_modulo(x)
{
  var q1 = biDivideByRadixPower(x, this.k - 1);
  var q2 = biMultiply(q1, this.mu);
  var q3 = biDivideByRadixPower(q2, this.k + 1);
  var r1 = biModuloByRadixPower(x, this.k + 1);
  var r2term = biMultiply(q3, this.modulus);
  var r2 = biModuloByRadixPower(r2term, this.k + 1);
  var r = biSubtract(r1, r2);
  if (r.isNeg) {
    r = biAdd(r, this.bkplus1);
  }
  var rgtem = biCompare(r, this.modulus) >= 0;
  while (rgtem) {
    r = biSubtract(r, this.modulus);
    rgtem = biCompare(r, this.modulus) >= 0;
  }
  return r;
}

function BarrettMu_multiplyMod(x, y) {
  /*
  x = this.modulo(x);
  y = this.modulo(y);
  */
  var xy = biMultiply(x, y);
  return this.modulo(xy);
}

function BarrettMu_powMod(x, y) {
  var result = new BigInt();
  result.digits[0] = 1;
  var a = x;
  var k = y;
  while (true) {
    if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
    k = biShiftRight(k, 1);
    if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
    a = this.multiplyMod(a, a);
  }
  return result;
}

BigIntUtil.setMaxDigits = function (value) {
  maxDigits = value;
  ZERO_ARRAY = new Array(maxDigits);
  for (let iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0;
  bigZero = new BigInt();
  bigOne = new BigInt();
  bigOne.digits[0] = 1;
}

BigIntUtil.RSAKeyPair = function (encryptionExponent, decryptionExponent, modulus) {
  this.e = biFromHex(encryptionExponent);
  this.d = biFromHex(decryptionExponent);
  this.m = biFromHex(modulus);
  // We can do two bytes per digit, so
  // chunkSize = 2 * (number of digits in modulus - 1).
  // Since biHighIndex returns the high index, not the number of digits, 1 has
  // already been subtracted.
  this.chunkSize = 2 * biHighIndex(this.m);
  this.radix = 16;
  this.barrett = new BarrettMu(this.m);
}


export default BigIntUtil;

