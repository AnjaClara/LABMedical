const get = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

const Set = (key, data) => {
  const currData = get(key) || [];
  localStorage.setItem(key, JSON.stringify([...currData, data]))
}

export const LocalStorageService = {
  get,
  Set,
}