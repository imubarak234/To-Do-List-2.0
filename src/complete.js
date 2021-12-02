const isCompleted = (task) => {
  if (task.completed) {
    task.completed = false;
  } else {
    task.completed = true;
  }
};

export { isCompleted as default };