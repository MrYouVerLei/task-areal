import EmployeeService from "../services/EmployeeService.js";

class EmployeeController {
    async getAllEmployees(req, res) {
        try {
            const { departmentId, positionId } = req.query;
            const employees = await EmployeeService.getAllEmployees(departmentId, positionId);
            return res.json(employees);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getEmployee(req, res) {
        try {
            const { id } = req.params;
            const employee = await EmployeeService.getEmployee(id);

            if (!employee) {
                return res.status(404).json({ message: "Сотрудник не найден" });
            }

            return res.json(employee);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async updateEmployee(req, res) {
        try {
            const { id } = req.params;
            const updatedEmployee = await EmployeeService.updateEmployee(id, req.body);

            if (!updatedEmployee) {
                return res.status(404).json({ message: "Сотрудник не найден" });
            }

            return res.json(updatedEmployee);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async createEmployee(req, res) {
        try {
            const employee = await EmployeeService.createEmployee(req.body);

            return res.status(201).json(employee);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async dismissEmployee(req, res) {
        try {
            const { id } = req.params;
            const dismissEmployee = await EmployeeService.dismissEmployee(id);

            if (!dismissEmployee) {
                return res.status(404).json({ message: "Сотрудник не найден" });
            }

            return res.json(dismissEmployee);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async searchEmployees(req, res) {
        try {
            const { lastName, firstName, patronymic, departmentId, positionId } = req.query;
            const employees = await EmployeeService.getSearchEmployeesByName(lastName, firstName, patronymic, departmentId, positionId);

            return res.json(employees);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}


export default new EmployeeController();