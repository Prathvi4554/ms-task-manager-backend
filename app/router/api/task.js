const { taskController } = require('../../controller/index')
const { ResponseMiddleware, verifyJWT } = require('../../middlewares/index')

module.exports = {
  group: {
    path: '/task',
    middleware: [ResponseMiddleware, verifyJWT]
  },
  route: [
    {
      path: '/create',
      method: 'post',
      handler: taskController.createTask
    },
    {
      path: '/fetch',
      method: 'post',
      handler: taskController.fetchTask
    },
    {
      path: '/updateStatus',
      method: 'post',
      handler: taskController.updateStatusById
    },
    {
      path: '/delete',
      method: 'post',
      handler: taskController.deleteTaskById
    }
  ]
}