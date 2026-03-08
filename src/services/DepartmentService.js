import models from "../../models/index.js";
const { Department } = models;

class DepartmentService {
    async getAllDepartments() {
        const departments = await Department.findAll({
            order: ['name']
        }
        );
        return departments;
    }
}

export default new DepartmentService();