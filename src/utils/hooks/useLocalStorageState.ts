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
    window.dispatchEvent(new CustomEvent("localStorageChange")); // NOTE: 같은 탭에서의 setItem에 대해서는 storage 이벤트가 발생하지 않으므로 커스텀 이벤트를 활용
  };

  useEffect(() => {
    const updateValueOnStorageUpdate = () => {
      console.log("update happened!");
      setLocalState(loadFromStorage() || initialValue);
    };

    window.addEventListener("storage", updateValueOnStorageUpdate);
    window.addEventListener("localStorageChange", updateValueOnStorageUpdate);

    return () => {
      window.removeEventListener("storage", updateValueOnStorageUpdate);
      window.removeEventListener(
        "localStorageChange",
        updateValueOnStorageUpdate,
      );
    };
  }, [key, initialValue, loadFromStorage]);

  return [localState, setValue] as const;
};
