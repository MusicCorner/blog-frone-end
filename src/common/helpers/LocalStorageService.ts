/* eslint-disable class-methods-use-this */
export enum LocalStorageKeys {
  AccessToken = 'accessToken',
}

export class LocalStorageService {
  static get(key: keyof LocalStorageKeys) {
    return localStorage.getItem(key as unknown as string);
  }

  static set(key: LocalStorageKeys, value: string) {
    return localStorage.setItem(key as unknown as string, value);
  }

  static remove(key: LocalStorageKeys) {
    return localStorage.removeItem(key as unknown as string);
  }
}
