import Router from 'express';
import EmployeeController from '../controllers/EmployeeController.js';
import DepartmentController from '../controllers/DepartmentController.js';
import PositionController from '../controllers/PositionController.js';

const router = new Router();

router.get('/employees', EmployeeController.getAllEmployees);
router.get('/departments', DepartmentController.getAllDepartments);
router.get('/positions', PositionController.getAllPositions);
router.get('/employees/:id', EmployeeController.getEmployee);
router.get('/employees/search', EmployeeController.searchEmployees);
router.put('/employees/:id', EmployeeController.updateEmployee);
router.patch('/employees/:id/dismiss', EmployeeController.dismissEmployee);
router.post('/employees', EmployeeController.createEmployee);

export default router;