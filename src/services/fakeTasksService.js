import * as rangesAPI from "./fakeRangeService";

const corta = { id: "5b21ca3eeb7f6fbccd471818", name: "Corta" };
const media = { id: "5b21ca3eeb7f6fbccd471814", name: "Media" };
const larga = { id: "5b21ca3eeb7f6fbccd471820", name: "Larga" };

let tasks = [];

export const generateTasks = (total) => {
  for (let i = 1; i <= total; i++) {
    let task = {
      _id: `5b21ca3eeb7f6fbccd47131${i}`,
      title: `Tarea ${i}`,
      description: `Resolver tarea ${i}`,
      mins: Math.floor(Math.random() * 121),
      secs: Math.floor(Math.random() * 61),
      range: {
        _id: undefined,
        _name: undefined,
      },
      completed: true,
      elapsedTime: undefined,
    };

    if (task.mins <= 30) {
      task.range._id = corta.id;
      task.range.name = corta.name;
    } else if (task.mins > 30 && task.mins <= 60) {
      task.range._id = media.id;
      task.range.name = media.name;
    } else if (task.mins > 60) {
      task.range._id = larga.id;
      task.range.name = larga.name;
    }

    let timeInSecs = task.mins * 60 + task.secs;

    task.elapsedTime = Math.floor(
      timeInSecs * 0.8 + Math.floor(Math.random() * (timeInSecs * 0.2))
    );

    tasks.push(task);
  }
  return tasks;
};

tasks = generateTasks(50);

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
