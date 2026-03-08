import DepartmentService from "../services/DepartmentService.js";

class DepartmentController {
    async getAllDepartments(req, res) {
        try {
            const departments = await DepartmentService.getAllDepartments();
            return res.json(departments);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}


export default new DepartmentController();