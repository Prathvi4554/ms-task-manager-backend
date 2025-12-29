class User {

  constructor({ userRepository }) {
    this.userRepository = userRepository
    this.createUser = this.createUser.bind(this)
    this.fetchUser = this.fetchUser.bind(this)
  }

  async createUser(ctx) {

    let { name, email, password } = ctx.request.body

    if (!name || !email || !password) {
      throw { message: "Please provide your name, email, and password.", status: 400 }
    }

    return await this.userRepository.createUser({ name, email, password })
  }

  async fetchUser(ctx) {

    let { email, password } = ctx.request.body

    if (!email || !password) {
      throw { message: "Please provide email and password.", status: 400 }
    }

    return await this.userRepository.fetchUser({ email, password })
  }


}
module.exports = User
