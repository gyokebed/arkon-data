import * as rangesAPI from "./fakeRangeService";

const tasks = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Email",
    description: "Responder email a cliente de China",
    range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Usuario",
    description: "Agregar nuevos usuario a la plataforma",
    range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Feature 1",
    description: "Resolver feature 1",
    range: { _id: "5b21ca3eeb7f6fbccd471820", name: "Mediana" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Feature 2",
    description: "Resolver feature 2",
    range: { _id: "5b21ca3eeb7f6fbccd471814", name: "Larga" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Feature 3",
    description: "Resolver Feature 3",
    range: { _id: "5b21ca3eeb7f6fbccd471814", name: "Larga" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Feature 4",
    description: "Resolver feature 4",
    range: { _id: "5b21ca3eeb7f6fbccd471814", name: "Larga" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Feature 5",
    description: "Resolver feature 5",
    range: { _id: "5b21ca3eeb7f6fbccd471820", name: "Mediana" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Feature 6",
    description: "Resolver feature 6",
    range: { _id: "5b21ca3eeb7f6fbccd471820", name: "Mediana" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Feature 7",
    description: "Resolver feature 7",
    range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
  },
];

export function getTasks() {
  return tasks;
}

export function getTask(id) {
  return tasks.find((t) => t._id === id);
}

export function saveTask(task) {
  let taskInDb = tasks.find((t) => t._id === task._id) || {};
  taskInDb.title = task.title;
  taskInDb.description = task.description;
  taskInDb.range = rangesAPI.ranges.find((r) => r._id === task.rangeId);

  if (!taskInDb._id) {
    taskInDb._id = Date.now().toString();
    tasks.push(taskInDb);
  }

  return taskInDb;
}

export function deleteTask(id) {
  let taskInDb = tasks.find((t) => t._id === id);
  tasks.splice(tasks.indexOf(taskInDb), 1);
  return taskInDb;
}
