import { LocalStorageService } from "../LocalStorage.service";

const key = 'exams';

const Get = () => {
  return LocalStorageService.get(key) || [];
}

const Show = (id) => {
  return Get().find(exam => exam.id === id);
}

const ShowByEmail = (email) => {
  return Get().find(exam => exam.email === email);
}

const ShowByName = (name) => {
  return Get().find(exam => exam.name === name);
}

const Create = (data) => {
  const body = {
    ...data,
    id: (Get().length || 0) + 1    
  } 
  LocalStorageService.Set(key, body);
  console.log(body)
}

const Update = (id, data) => {
  let exam = Show(id);
  exam = {...data};

  let exams = Get();
  exams[exams.indexOf(Show(id))] = exam;

  Create(exams);
}

const Delete = (id) => {
  Create(Get().find(exam => exam.id != id))
}

export const ExamService = {
  Get,
  Show,
  ShowByEmail,
  ShowByName,
  Create,
  Update,
  Delete,
}