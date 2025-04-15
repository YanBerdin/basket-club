// hooks/useLocalStorage.js ou hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error getting item from localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting item in localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage; // Assurez-vous que le hook est exporté
