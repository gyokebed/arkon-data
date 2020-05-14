import * as rangesAPI from "./fakeRangeService";

let tasks = [
  {
    _id: "5b21ca3eeb7f6fbccd471317",
    title: "Feature 1",
    description: "Resolver feature 1",
    mins: 35,
    secs: 0,
    range: { _id: "5b21ca3eeb7f6fbccd471820", name: "Larga" },
    completed: true,
    elapsedTime: 2100,
    completedItemDate: null,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    title: "Feature 2",
    description: "Resolver feature 2",
    mins: 120,
    secs: 30,
    range: { _id: "5b21ca3eeb7f6fbccd471814", name: "Media" },
    completed: true,
    elapsedTime: 7100,
    completedItemDate: null,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    title: "Feature 3",
    description: "Resolver Feature 3",
    mins: 25,
    secs: 0,
    range: { _id: "5b21ca3eeb7f6fbccd471814", name: "Media" },
    completed: true,
    elapsedTime: 500,
    completedItemDate: null,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    title: "Feature 4",
    description: "Resolver feature 4",
    mins: 40,
    secs: 5,
    range: { _id: "5b21ca3eeb7f6fbccd471814", name: "Media" },
    completed: true,
    elapsedTime: 2400,
    completedItemDate: null,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    title: "Feature 5",
    description: "Resolver feature 5",
    mins: 15,
    secs: 0,
    range: { _id: "5b21ca3eeb7f6fbccd471820", name: "Larga" },
    completed: true,
    elapsedTime: 300,
    completedItemDate: null,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    title: "Feature 6",
    description: "Resolver feature 6",
    mins: 115,
    secs: 30,
    range: { _id: "5b21ca3eeb7f6fbccd471820", name: "Larga" },
    completed: true,
    elapsedTime: 6800,
    completedItemDate: null,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    title: "Feature 7",
    description: "Resolver feature 7",
    mins: 60,
    secs: 0,
    range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
    completed: true,
    elapsedTime: 3600,
    completedItemDate: null,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    title: "Feature 8",
    description: "Resolver feature 8",
    mins: 80,
    secs: 5,
    range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
    completed: true,
    elapsedTime: 4000,
    completedItemDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    title: "Feature 9",
    description: "Resolver feature 9",
    mins: 20,
    secs: 30,
    range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
    completed: true,
    elapsedTime: 1100,
    completedItemDate: "2018-01-03T19:04:28.809Z",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    title: "Feature 10",
    description: "Resolver feature 10",
    mins: 20,
    secs: 30,
    range: { _id: "5b21ca3eeb7f6fbccd471818", name: "Corta" },
    completed: true,
    elapsedTime: 1100,
    completedItemDate: "2018-01-03T19:04:28.809Z",
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
  taskInDb.mins = task.mins;
  taskInDb.secs = task.secs;
  taskInDb.range = rangesAPI.ranges.find((r) => r._id === task.rangeId);
  taskInDb.completed = false;
  taskInDb.elapsedTime = 0;
  taskInDb.completedItemDate = null;

  if (!taskInDb._id) {
    taskInDb._id = Date.now().toString();
    tasks.push(taskInDb);
  }

  return taskInDb;
}

export function reorderTasks(items) {
  const completedTasks = tasks.filter((t) => {
    return t.completed === true;
  });
  tasks = [...completedTasks, ...items];
  return tasks;
}

export function deleteTask(id) {
  let taskInDb = tasks.find((t) => t._id === id);
  tasks.splice(tasks.indexOf(taskInDb), 1);
  return taskInDb;
}

export function finishTask(task, elapsedTime) {
  let taskInDB = tasks.find((t) => {
    return t._id === task._id;
  });
  taskInDB.completed = true;
  taskInDB.completedItemDate = +new Date();
  taskInDB.elapsedTime = elapsedTime;

  return tasks;
}
