const { jwtExpiresIn } = require("../config/config")

class User {

    constructor({ userService, createHash, ObjectId, loadConfig, jwt }) {
        this.userService = userService
        this.createHash = createHash
        this.ObjectId = ObjectId
        this.loadConfig = loadConfig
        this.jwt = jwt
    }

    async createUser({ name, email, password}) {

        try {
            const _id = new this.ObjectId().toString();

            password = await this.createHash(password + '')

            const userQuery = {
                _id,
                name,
                email,
                password
            }

            return await this.userService.createUser(userQuery)
        } catch (err) {
            throw { message: 'Failed to create user', status: 500 }
        }
    }


    async fetchUser({ email, password }) {

        password = await this.createHash(password + '')

        const userData = await this.userService.fetchUserByEmail({ email })

        if (userData.password != password) {
            throw { message: 'Invalid Password', status: 401 }
        }

        delete userData.password

        let jwtToken = await this.generateToken(userData)
        
        userData.token = jwtToken;

        return userData;
    }


    async generateToken(userData) {
        return this.jwt.sign(
            {
                userId: userData._id,
                email: userData.email
            },
            this.loadConfig.jwtSecretKey,
            { expiresIn: this.loadConfig.jwtExpiresIn }
        );
    }

}

module.exports = User;