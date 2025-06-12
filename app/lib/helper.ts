export const clearLocalStorage=()=>{
    return  localStorage.clear(); 
}

export const getLocalStorageItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  
  export const setLocalStorageItem = (key: string, value: string): void => {
    localStorage.setItem(key, value);
  };
  