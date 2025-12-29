class Task {

    constructor({ db }) {
        this.db = db;
    }

    async createTask(taskQuery) {
        try {
            await this.db.execute(
                'INSERT INTO tasks (_id, header, description, status, user_id) VALUES (?, ?, ?, ?, ?)',
                [taskQuery._id, taskQuery.header, taskQuery.description, taskQuery.status, taskQuery.user_id]
            );
            return { status: 'success' }
        } catch (err) {
            throw { message: 'Failed create the Task', status: 500 }
        }
    }

    async fetchTask(taskQuery) {

        try {
            let [rows] = []

            if (taskQuery.is_admin) {
                [rows] = await this.db.query('SELECT * FROM tasks');
            }

            if (!taskQuery.is_admin) {
                [rows] = await this.db.query('SELECT * FROM tasks WHERE user_id = ?', [taskQuery.user_id]);
            }

            if (!rows.length) {
                throw { message: 'Task Details Not Found', status: 400 }
            }

            return rows
        } catch (err) {
            throw { message: 'Failed fetch the Task', status: 500 }
        }
    }


    async updateStatusById(task_id, status) {
        try {
            const [result] = await this.db.execute(
                'UPDATE tasks SET status = ? WHERE _id = ?',
                [status, task_id]
            );
            return result;
        } catch (err) {
            throw { message: 'Failed update the Status of the Task', status: 500 }
        }
    }

    async deleteTaskById({ task_id }) {
        try {
            const [result] = await this.db.execute(
                'DELETE FROM tasks WHERE _id = ?',
                [task_id])

            return result;
        }
        catch (err) {
            throw { message: 'Failed delete the task', status: 500 }
        }

    
    }


}

module.exports = Task