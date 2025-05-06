// app/utils/encryption.ts

import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";
import CryptoJS from "crypto-js";

const IDX_KEY = "emailIndexKey";
const ENC_KEY = "emailEncryptKey";

/**
 * Fetch or generate a 256-bit key (hex) in SecureStore,
 * then parse into a CryptoJS WordArray.
 */
async function getKey(token: string): Promise<CryptoJS.lib.WordArray> {
  let hex = await SecureStore.getItemAsync(token);
  console.log(`Stored hex for ${token}:`, hex);

  if (!hex) {
    // generate 32 random bytes
    const rnd = await Crypto.getRandomBytesAsync(32);

    // convert Uint8Array → WordArray → hex
    const wa = CryptoJS.lib.WordArray.create(rnd);
    hex = wa.toString(CryptoJS.enc.Hex);
    console.log(`Generated new hex for ${token}:`, hex);

    await SecureStore.setItemAsync(token, hex);
  }

  return CryptoJS.enc.Hex.parse(hex);
}

/** HMAC-SHA256 blind index → hex */
export async function blindIndex(email: string): Promise<string> {
  const key = await getKey(IDX_KEY);
  const hmac = CryptoJS.HmacSHA256(email, key);
  return hmac.toString(CryptoJS.enc.Hex);
}

/** AES-CBC encrypt email → { iv, ct } */
export async function encryptEmail(email: string) {
  const key = await getKey(ENC_KEY);

  // 16 random bytes for IV
  const ivBytes = await Crypto.getRandomBytesAsync(16);
  const ivWA = CryptoJS.lib.WordArray.create(ivBytes);

  const encrypted = CryptoJS.AES.encrypt(email, key, {
    iv: ivWA,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    iv: ivWA.toString(CryptoJS.enc.Hex),
    ct: encrypted.ciphertext.toString(CryptoJS.enc.Hex),
  };
}
