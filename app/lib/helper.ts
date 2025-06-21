
import CryptoJS from 'crypto-js';

export const clearLocalStorage=()=>{
    return  localStorage.clear(); 
}

export const setEncryptedLocalStorageItem = (key: string, value: string): void => {
  const encryptedValue = encrypt(value);
  localStorage.setItem(key, encryptedValue);
};

export const getEncryptedLocalStorageItem = (key: string): string | null => {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) return null;

  try {
    return decrypt(encryptedValue);
  } catch (err) {
    console.error('Decryption failed for key:', key, err);
    return null;
  }
};
  


 export  const formatDateTime=(dateString: string): string=> {
    const formatted = new Date(dateString.replace(" ", "T")).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    return formatted;
  }
  

  export const encrypt = (text: string): string => {
    return CryptoJS.AES.encrypt(text, process.env.SECRET||'').toString();
  };
  
  export const decrypt = (cipher: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipher, process.env.SECRET||'');
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  
  export function getOrdinal(value: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const v = value % 100;
    return value + (
      suffixes[(v - 20) % 10] || 
      suffixes[v] || 
      suffixes[0]
    );
  }
  