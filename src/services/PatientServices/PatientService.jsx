import { LocalStorageService } from "../LocalStorage.service";

const key = 'patients';

const Get = () => {
  return LocalStorageService.get(key) || [];
}

const Show = (id) => {
  return Get().find(patient => patient.id === id);
}

const ShowByEmail = (email) => {
  return Get().find(patient => patient.email === email);
}

const ShowByName = (name) => {
  return Get().find(patient => patient.name === name);
}

const Create = (data) => {
  const body = {
    ...data,
    id: (Get().length || 0) + 1
  }
  LocalStorageService.Set(key, body);
}

const Update = (id, data) => {
  let patient = Show(id);
  patient = {...data};

  let patients = Get();
  patients[patients.indexOf(Show(id))] = patient;

  Create(patients);
}

const Delete = (id) => {
  Create(Get().find(patient => patient.id != id))
}

export const PatientService = {
  Get,
  Show,
  ShowByEmail,
  ShowByName,
  Create,
  Update,
  Delete,
}