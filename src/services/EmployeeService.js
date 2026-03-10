import models from "../../models/index.js";
const { Department, Employee, Position } = models;

class EmployeeService {
    async getAllEmployees(departmentId, positionId) {
        const whereCombo = {};

        if (departmentId) {
            whereCombo.department_id = departmentId;
        }
        if (positionId) {
            whereCombo.position_id = positionId;
        }

        const employees = await Employee.findAll({
            where: whereCombo,
            include: [
                { model: Department, attributes: ['name'] },
                { model: Position, attributes: ['name'] }
            ],
            order: [
                ['last_name'],
                ['first_name'],
                ['patronymic']
            ]
        }
        );
        return employees;
    }

    async getEmployee(employeeId) {
        const employee = await Employee.findOne({
            where: {
                id: employeeId
            },
            include: [
                { model: Department },
                { model: Position }
            ]
        }
        );
        return employee;
    }

    async updateEmployee(employeeId, editData) {
        const employee = await this.getEmployee(employeeId);

        if (!employee) {
            return null;
        }

        await employee.update(editData);

        return await this.getEmployee(employeeId);
    }

    async createEmployee(data) {
        const newEmployee = await Employee.create(data);

        return await this.getEmployee(newEmployee.id);
    }

    async dismissEmployee(employeeId) {
        const employee = await this.getEmployee(employeeId);

        if (!employee) {
            return null;
        }

        await employee.update({
            is_working: false
        });

        return await this.getEmployee(employeeId);
    }

    async getSearchEmployeesByName(lastName, firstName, patronymic, departmentId, positionId) {
        const whereCombo = {};

        if (lastName) {
            whereCombo.last_name = { [Op.iLike]: `%${lastName}%` };
        }
        if (firstName) {
            whereCombo.first_name = { [Op.iLike]: `%${firstName}%` };
        }
        if (patronymic) {
            whereCombo.patronymic = { [Op.iLike]: `%${patronymic}%` };
        }
        if (departmentId) {
            whereCombo.department_id = departmentId;
        }
        if (positionId) {
            whereCombo.position_id = positionId;
        }

        const employees = await Employee.findAll({
            where: whereCombo,
            include: [
                { model: Department, attributes: ['name'] },
                { model: Position, attributes: ['name'] }
            ]
        });

        return employees;
    }
}

export default new EmployeeService();