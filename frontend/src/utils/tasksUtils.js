export const convertDataInListTasks = (data) => {
  let tasksAux = data.filter((el) => el.status === null && el.taskId === null);
  let waitingsAux = data.filter(
    (el) => el.status === "WAITING" && el.taskId === null
  );
  let startedsAux = data.filter(
    (el) => el.status === "STARTED" && el.taskId === null
  );
  let closedsAux = data.filter(
    (el) => el.status === "CLOSED" && el.taskId === null
  );

  let letSubTasksAux = data.filter((el) => el.taskId !== null);

  let tasks = [];
  tasks["TASKS"] = tasksAux;
  tasks["WAITING"] = waitingsAux;
  tasks["STARTED"] = startedsAux;
  tasks["CLOSED"] = closedsAux;
  tasks["SUB_TASKS"] = letSubTasksAux;
  return tasks;
};
