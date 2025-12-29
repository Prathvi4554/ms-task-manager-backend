const { TASK_STATUS } = require('../shared/constant')

class Task {

    constructor({ taskService, ObjectId }) {
        this.taskService = taskService
        this.ObjectId = ObjectId;

    }

    async createTask({ header, description, user_id }) {

        const taskQuery = {
            _id: new this.ObjectId().toString(),
            header,
            description,
            status: 'Pending',
            user_id
        }

        return await this.taskService.createTask(taskQuery)

    }

    async fetchTask({ user_id, is_admin }) {

        const taskQuery = {
            user_id,
            is_admin
        }

        return await this.taskService.fetchTask(taskQuery)

    }
    async updateStatusById({ task_id, status }) {

        if (!TASK_STATUS.includes(status)) {
            throw { message: 'Invalid status. Please provide a valid status', status: 422 }
        }

        await this.taskService.updateStatusById(task_id, status)

        return { task_id, status }

    }

    async deleteTaskById({ task_id }) {

        await this.taskService.deleteTaskById({task_id})

        return { status: "Task is deleted" }
    }
}

module.exports = Task;