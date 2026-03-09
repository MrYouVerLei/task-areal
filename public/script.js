function toggleMenu(event, button) {
    event.stopPropagation();
    const currentMenu = button.nextElementSibling;

    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu !== currentMenu) {
            menu.classList.remove('active');
        }
    });

    currentMenu.classList.toggle('active');
}

document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});

var infoDialog = document.getElementById('info-dialog');
var formDialog = document.getElementById('form-dialog');

function openInfoDialog(id) {
    renderInfo(id);
    infoDialog.showModal();
}

function closeInfoDialog() {
    infoDialog.close();
}

function openFormDialog() {
    formDialog.showModal();
}

function closeFormDialog() {
    formDialog.close();
}

renderTable();
fillDepartments();
fillPositions();

async function getAllEmployees() {
    try {
        const employeesResponse = await fetch(`/api/employees`);

        if (employeesResponse.status != 200) {
            return null;
        }

        const employeesData = await employeesResponse.json();

        const filteredData = employeesData.map(employee => {
            return {
                id: employee.id,
                fullName: `${employee.last_name} ${employee.first_name} ${employee.patronymic}`,
                departmentName: employee.Department.name,
                positionName: employee.Position.name,
                status: employee.is_working ? "Работает" : "Уволен",
                hireDate: new Date(employee.hire_date).toLocaleDateString()
            };
        });

        return filteredData;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function getEmployee(id) {
    try {
        const employeeResponse = await fetch(`/api/employees/${id}`);

        if (employeeResponse.status != 200) {
            return null;
        }

        const employee = await employeeResponse.json();

        return {
            id: employee.id,
            fullName: `${employee.last_name} ${employee.first_name} ${employee.patronymic}`,
            birthDate: new Date(employee.birth_date).toLocaleDateString(),
            passport: employee.passport,
            departmentName: employee.Department.name,
            positionName: employee.Position.name,
            status: employee.is_working ? "Работает" : "Уволен",
            hireDate: new Date(employee.hire_date).toLocaleDateString(),
            salary: employee.salary,
            phone: employee.phone,
            email: employee.email
        };
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function renderTable() {
    const table = document.getElementById('table');

    if (table != null) {
        const employees = await getAllEmployees();
        let html = '';
        employees.forEach(employee => {
            if (employee.status == "Уволен") {
                html += `<tr data-id="${employee.id}">
                        <td>${employee.fullName}</td>
                        <td>${employee.departmentName}</td>
                        <td>${employee.positionName}</td>
                        <td class="status">${employee.status}</td>
                        <td>${employee.hireDate}</td>
                        <td>
                            <div class="menu-container">
                                <button class="menu-button" onclick="toggleMenu(event, this)">⋮</button>
                                <div class="dropdown-menu">
                                    <button class="dropdown-menu__item" onclick="renderInfo(${employee.id})">Подробнее</button>
                                </div>
                            </div>
                        </td>
                    </tr>`;
            } else {
                html += `<tr data-id="${employee.id}">
                        <td>${employee.fullName}</td>
                        <td>${employee.departmentName}</td>
                        <td>${employee.positionName}</td>
                        <td class="status">${employee.status}</td>
                        <td>${employee.hireDate}</td>
                        <td>
                            <div class="menu-container">
                                <button class="menu-button" onclick="toggleMenu(event, this)">⋮</button>
                                <div class="dropdown-menu">
                                    <button class="dropdown-menu__item" onclick="renderInfo(${employee.id})">Подробнее</button>
                                    <button class="dropdown-menu__item dropdown-menu__item__edit">Редактировать</button>
                                    <button class="dropdown-menu__item dropdown-menu__item__delete" onclick="dismissEmployee(${employee.id})">Уволить</button>
                                </div>
                            </div>
                        </td>
                    </tr>`;
            }
        });
        table.innerHTML = html;
    }
}

async function renderInfo(id) {
    const employee = await getEmployee(id);

    if (employee != null) {
        document.getElementById('info__full-name').textContent = employee.fullName;
        document.getElementById('info__birth-date').textContent = employee.birthDate;
        document.getElementById('info__passport').textContent = employee.passport;
        document.getElementById('info__department-name').textContent = employee.departmentName;
        document.getElementById('info__position-name').textContent = employee.positionName;
        document.getElementById('info__status').textContent = employee.status;
        document.getElementById('info__salary').textContent = employee.salary;
        document.getElementById('info__hire-date').textContent = employee.hireDate;
        if (employee.email) {
            document.getElementById('info__phone-email').textContent = `${employee.phone}, ${employee.email}`;
        } else {
            document.getElementById('info__phone-email').textContent = employee.phone;
        }
        infoDialog.showModal();
    }
}

async function dismissEmployee(id) {
    try {
        const response = await fetch(`/api/employees/${id}/dismiss`, { method: 'PATCH' });

        if (response.status != 200) {
            return;
        }

        const row = document.querySelector(`tr[data-id="${id}"]`);
        row.querySelector('.status').textContent = "Уволен";
        row.querySelector('.dropdown-menu__item__edit').remove();
        row.querySelector('.dropdown-menu__item__delete').remove();

    } catch (err) {
        console.error(err);
    }
}

async function fillDepartments() {
    try {
        const departmentsResponse = await fetch(`/api/departments`);

        if (departmentsResponse.status != 200) {
            return;
        }

        const departmentsData = await departmentsResponse.json();
        const departmentsSelect = document.getElementById('departments-select');

        departmentsData.forEach(department => {
            const option = document.createElement('option');
            option.value = department.id;
            option.textContent = department.name;
            departmentsSelect.appendChild(option);
        });
    } catch (err) {
        console.error(err);
        return;
    }
}

async function fillPositions() {
    try {
        const positionsResponse = await fetch(`/api/positions`);

        if (positionsResponse.status != 200) {
            return;
        }

        const positionsData = await positionsResponse.json();
        const positionsSelect = document.getElementById('positions-select');

        positionsData.forEach(position => {
            const option = document.createElement('option');
            option.value = position.id;
            option.textContent = position.name;
            positionsSelect.appendChild(option);
        });
    } catch (err) {
        console.error(err);
        return;
    }
}