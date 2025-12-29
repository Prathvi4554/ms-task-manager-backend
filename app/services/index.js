const db = require('../config/db');

const UserService = require('./user-service')
const TaskService = require('./task-service')

const userService = new UserService({ db })
const taskService = new TaskService({ db })

module.exports = {
    userService,
    taskService
}