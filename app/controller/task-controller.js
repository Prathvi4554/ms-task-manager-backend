class Task {

    constructor({ taskRepository }) {
        this.taskRepository = taskRepository
        this.createTask = this.createTask.bind(this)
        this.fetchTask = this.fetchTask.bind(this)
        this.updateStatusById = this.updateStatusById.bind(this)
        this.deleteTaskById = this.deleteTaskById.bind(this)
    }

    async createTask(ctx) {

        const { user_id, header, description } = ctx.request.body

        if (!header || !description) {
            throw { message: "Please provide header and description", status: 400 }
        }

        return await this.taskRepository.createTask({ header, description, user_id })

    }



    async fetchTask(ctx) {

        const { user_id, is_admin } = ctx.request.body

        if (!user_id) {
            throw { message: "Please provide user_id", status: 400 }
        }

        return await this.taskRepository.fetchTask({ user_id, is_admin })
    }

    async updateStatusById(ctx) {

        const { task_id, status } = ctx.request.body

        if (!status) {
            throw { message: "Please provide status", status: 400 }
        }

        return await this.taskRepository.updateStatusById({ task_id, status })
    }

    async deleteTaskById(ctx) {

        const { task_id } = ctx.request.body

        if (!task_id) {
            throw { message: "Please provide a task_id", status: 400 }
        }

        return await this.taskRepository.deleteTaskById({ task_id })
    }
}
module.exports = Task