import { LocalStorageService } from "./LocalStorage.service";

const get = () => {
  return LocalStorageService.get('auth');
}

const Set = (data) => {
  localStorage.setItem('auth', JSON.stringify(data))
}

export const AuthService = {
  get,
  Set,
}