// 2025/05/10
// O() time complexity
// O(1) space complexity
// Time to complete: ?? min
// Patterns: Hashmap, Sorting, Design
// Notes w.r.t. solution:

var TodoList = function () {
  this.users = {};    // users[userId] = set{taskIds}
  //this.tasks = {};    // task[taskId] = { taskDescription, dueDate, tags }
  //this.tags = {};     // tags[tag] = set{taskIds}
  this.nextTaskId = 0;
};

/**
* @param {number} userId
* @param {string} taskDescription
* @param {number} dueDate
* @param {string[]} tags
* @return {number}
*/
TodoList.prototype.addTask = function (userId, taskDescription, dueDate, tags) {
  // Adds a task for the user with the ID userId with a due date equal to dueDate and a list of tags attached to the task.
  // The return value is the ID of the task.
  // This task ID starts at 1 and is sequentially increasing. That is, the first task's id should be 1, the second task's id should be 2, and so on.

  if (!(userId in this.users)) {
    //this.users[userId] = new Set();
    this.users[userId] = {};
  }

  this.nextTaskId++;
  const task = { taskDescription, dueDate, tags: new Set(tags) }
  //this.tasks[this.nextTaskId] = task;
  //this.users[userId].add(this.nextTaskId);
  this.users[userId][this.nextTaskId] = task;

  return this.nextTaskId;
};

/**
* @param {number} userId
* @return {string[]}
*/
TodoList.prototype.getAllTasks = function (userId) {
  // Returns a list of all the tasks not marked as complete for the user with ID userId, ordered by the due date. You should return an empty list if the user has no uncompleted tasks.
  const tasks = this.getAllTaskObjects(userId);
  tasks.sort((a, b) => a.dueDate - b.dueDate);

  return this.getAllTaskDescriptions(tasks);
};

/**
* @param {number} userId
* @param {string} tag
* @return {string[]}
*/
TodoList.prototype.getTasksForTag = function (userId, tag) {
  // Returns a list of all the tasks that are not marked as complete for the user with the ID userId and have tag as one of their tags, ordered by their due date. Return an empty list if no such task exists.
  const tasks = this.getAllTaskObjects(userId);

  const tasksOfTag = [];
  for (const task of tasks) {
    if (task.tags.has(tag)) {
      tasksOfTag.push(task);
    }
  }
  tasksOfTag.sort((a, b) => a.dueDate - b.dueDate);

  return this.getAllTaskDescriptions(tasksOfTag);
};

TodoList.prototype.getAllTaskObjects = function (userId) {
  if (userId in this.users) {
    //const taskIds = this.users[userId];
    //const tasks = [];
    //for (const taskId of taskIds) {
    //    tasks.push(this.tasks[taskId])
    //}

    let tasks = Object.values(this.users[userId]);

    return tasks;
  } else {
    return [];
  }
}


TodoList.prototype.getAllTaskDescriptions = function (tasks) {
  const taskDescriptions = [];

  for (const task of tasks) {
    taskDescriptions.push(task.taskDescription);
  }

  return taskDescriptions;
}

/**
* @param {number} userId
* @param {number} taskId
* @return {void}
*/
TodoList.prototype.completeTask = function (userId, taskId) {
  // Marks the task with the ID taskId as completed only if the task exists and the user with the ID userId has this task, and it is uncompleted.

  // No need to retain completed tasks. Delete when completed
  if (!(userId in this.users)) {
    return;
  }

  const tasks = this.users[userId];
  if (!(taskId in tasks)) {
    return;
  }

  delete tasks[taskId];
};

/**
* Your TodoList object will be instantiated and called as such:
* var obj = new TodoList()
* var param_1 = obj.addTask(userId,taskDescription,dueDate,tags)
* var param_2 = obj.getAllTasks(userId)
* var param_3 = obj.getTasksForTag(userId,tag)
* obj.completeTask(userId,taskId)
*/