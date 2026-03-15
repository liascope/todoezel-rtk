// import { useEffect, useState } from 'react';
// 
// export default function useStorage(key, initialValue) {
//   
//   const [storedValue, setStoredValue] = useState(initialValue);
//   const [isClient, setIsClient] = useState(false);
//   const [err, setErr] = useState(null)
// 
//   useEffect(() => {
//     setIsClient(true);
//     // call only on browser 
//     if (typeof window !== 'undefined') {
//       try {
//         const item = localStorage.getItem(key);
//         setStoredValue(item ? JSON.parse(item) : initialValue);
//       } catch (error) {
//         console.error(`useStorage: Error reading "${key}" from localStorage`, error);
//         setStoredValue(initialValue);
//       }
//     }
//     {/* eslint-disable-next-line */}
//   }, [key]);
// 
//   const setValue = (value) => {
//     try {
//       const valueToStore = value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       if (typeof window !== 'undefined') {
//         localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       console.error(`useStorage: Error setting "${key}" to localStorage`, error);
//       setErr(error)
//     }
//   };
//   return [isClient ? storedValue : initialValue, setValue, err];
// }


import { useEffect, useState } from "react"

export default function useStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, Error | null] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isClient, setIsClient] = useState(false)
  const [err, setErr] = useState<Error | null>(null)

  useEffect(() => {
    setIsClient(true)
    // nur im Browser ausführen
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key)
        setStoredValue(item ? (JSON.parse(item) as T) : initialValue)
      } catch (error) {
        console.error(`useStorage: Error reading "${key}" from localStorage`, error)
        setStoredValue(initialValue)
        setErr(error as Error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(
        `useStorage: Error setting "${key}" to localStorage`,
        error
      )
      setErr(error as Error)
    }
  }

  return [isClient ? storedValue : initialValue, setValue, err]
}