import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'secret_key';

export const encrypt = (data: string): string =>
  CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();

export const decrypt = (ciphertext: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const encryptedStorage = {
  getItem: (name: string): string | null => {
    const encryptedData = localStorage.getItem(name);
    if (!encryptedData) return null;
    const decryptedData = decrypt(encryptedData);
    return decryptedData ? decryptedData : null;
  },
  setItem: (name: string, value: string): void => {
    const encryptedData = encrypt(value);
    localStorage.setItem(name, encryptedData);
  },
  removeItem: (name: string): void => {
    localStorage.removeItem(name);
  },
};
