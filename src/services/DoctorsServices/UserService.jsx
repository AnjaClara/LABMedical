import { LocalStorageService } from "../LocalStorage.service";

const key = 'users';

const Get = () => {
  return LocalStorageService.get(key) || [];
}

const Show = (id) => {
  return Get().find(user => user.id === id);
}

const ShowByEmail = (email) => {
  return Get().find(user => user.email === email);
}

const ShowByName = (name) => {
  return Get().find(user => user.name === name);
}

const Create = (data) => {
  const body = {
    ...data,
    id: (Get().length || 0) + 1
  }
  LocalStorageService.Set(key, body);
}

const Update = (id, data) => {
  let user = Show(id);
  user = {...data};

  let users = Get();
  users[users.indexOf(Show(id))] = user;

  Create(users);
}

const Delete = (id) => {
  Create(Get().find(user => user.id != id))
}

export const UserService = {
  Get,
  Show,
  ShowByEmail,
  ShowByName,
  Create,
  Update,
  Delete,
}