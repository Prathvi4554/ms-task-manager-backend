const { userController } = require('../../controller/index')
const { ResponseMiddleware } = require('../../middlewares/index')

module.exports = {
  group: {
    path: '/user',
    middleware: [ResponseMiddleware]
  },
  route: [
    {
      path: '/create',
      method: 'post',
      handler: userController.createUser
    },
        {
      path: '/fetch',
      method: 'post',
      handler: userController.fetchUser
    }
  ]
}