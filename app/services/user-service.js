class User {

    constructor({ db }) {
        this.db = db;
    }

    async createUser(userQuery) {
        try {
            await this.db.execute(
                'INSERT INTO users (_id, name, email, password) VALUES (?, ?, ?, ?)',
                [userQuery._id, userQuery.name, userQuery.email, userQuery.password]
            );
            return { status: 'success' }
        } catch (err) {
            throw { message: 'Failed create the User', status: 500 }
        }
    }

    async fetchUserByEmail({email}) {
        try {
            const [rows] = await this.db.query('SELECT * FROM users WHERE email = ?', [email]);

            if (!rows.length) {
                throw { message: 'User Not Found', status: 400 }
            }

            return rows[0]
        } catch (err) {
            throw { message: 'Failed fetch the User', status: 500 }
        }
    }

}

module.exports = User