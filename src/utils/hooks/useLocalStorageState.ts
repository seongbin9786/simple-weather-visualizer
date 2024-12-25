"use client";

import { useCallback, useEffect, useState } from "react";

export const useLocalStorageState = <StateType>(
  key: string,
  initialValue: StateType,
) => {
  const loadFromStorage = useCallback(
    () =>
      JSON.parse(
        window.localStorage.getItem(key) ?? JSON.stringify(initialValue),
      ) as StateType,
    [key, initialValue],
  );

  const [localState, setLocalState] = useState<StateType>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    const loadedFromStorage = loadFromStorage();
    if (!loadedFromStorage) {
      window.localStorage.setItem(key, JSON.stringify(initialValue));
    }
    return loadedFromStorage ? loadedFromStorage : initialValue;
  });

  const setValue = (value: StateType) => {
    setLocalState(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const updateValueOnStorageUpdate = () => {
      setLocalState(loadFromStorage() || initialValue);
    };

    window.addEventListener("storage", updateValueOnStorageUpdate);

    return () => {
      window.removeEventListener("storage", updateValueOnStorageUpdate);
    };
  }, [key, initialValue, loadFromStorage]);

  return [localState, setValue] as const;
};
