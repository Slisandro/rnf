import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { IUser } from "@/interfaces/IUser";

type UseStateHook<T> = [[boolean, IUser | null], (value: IUser | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: IUser | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, JSON.stringify(value));
    }
  }
}

export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<IUser>();

  // Get
  useEffect(() => {
    SecureStore.getItemAsync(key).then((value: string | null) => {
      if (value) {
        setState(JSON.parse(value));
      } else {
        setState(null);
      }
    });
  }, [key]);

  // Set
  const setValue = useCallback(
    (value: IUser | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}