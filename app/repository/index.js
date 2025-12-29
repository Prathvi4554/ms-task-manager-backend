const UserRepository = require('./user-repository')
const TaskRepository = require('./task-repository')

const {userService, taskService} = require('../services')

const { createHash} = require('../shared/utils')

const {ObjectId} = require('mongodb')
const { TASK_STATUS } = require('../shared/constant')

const  loadConfig = require('../config/config')
const jwt = require('jsonwebtoken');

const userRepository = new UserRepository({userService, createHash, ObjectId, loadConfig, jwt})
const taskRepository = new TaskRepository({taskService, ObjectId})

module.exports = {
    userRepository,
    taskRepository
}