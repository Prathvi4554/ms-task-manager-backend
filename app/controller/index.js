const {userRepository, taskRepository} = require('../repository')

const UserController = require('./user.controller')
const TaskController= require('./task-controller')

const userController = new UserController({userRepository})
const taskController = new TaskController({taskRepository})

module.exports = {
    userController,
    taskController
}