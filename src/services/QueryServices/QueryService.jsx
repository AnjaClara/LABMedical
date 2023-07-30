import { LocalStorageService } from "../LocalStorage.service";

const key = 'querys';

const Get = () => {
  return LocalStorageService.get(key) || [];
}

const Show = (id) => {
  return Get().find(query => query.id === id);
}

const ShowByEmail = (email) => {
  return Get().find(query => query.email === email);
}

const ShowByName = (name) => {
  return Get().find(query => query.name === name);
}

const Create = (data) => {
  const body = {
    ...data,
    id: (Get().length || 0) + 1
  }
  LocalStorageService.Set(key, body);
}

const Update = (id, data) => {
  let query = Show(id);
  query = {...data};

  let querys = Get();
  querys[querys.indexOf(Show(id))] = query;

  Create(querys);
}

const Delete = (id) => {
  Create(Get().find(query => query.id != id))
}

export const QueryService = {
  Get,
  Show,
  ShowByEmail,
  ShowByName,
  Create,
  Update,
  Delete,
}