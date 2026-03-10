var infoDialog = document.getElementById('info-dialog');
var formDialog = document.getElementById('form-dialog');

const passportMask = IMask(document.getElementById('form__passport'), {
    mask: '0000 000000',
    lazy: false,
});

const phoneMask = IMask(document.getElementById('form__phone'), {
    mask: '+{7}(000)000-00-00',
    lazy: false,
});

const salaryMask = IMask(document.getElementById('form__salary'), {
    mask: Number,
    scale: 2,
    signed: false,
    thousandsSeparator: ' ',
    padFractionalZeros: false,
    normalizeZeros: true,
    min: 0,
    max: 100000000
});

document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('active');
    });
});

document.getElementById('form__last-name').addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\-]/g, '');
    e.target.value = value;
});

document.getElementById('form__first-name').addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\-]/g, '');
    e.target.value = value;
});

document.getElementById('form__patronymic').addEventListener('input', (e) => {
    let value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\-]/g, '');
    e.target.value = value;
});

document.getElementById('form__email').addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase().replace(/[^a-z0-9@._%+\-]/g, '');
    e.target.value = value;
});

function closeInfoDialog() {
    infoDialog.close();
}

function closeFormDialog() {
    formDialog.close();
}

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

renderTable();
fillDepartments('departments-select', true);
fillPositions('positions-select', true);

async function saveForm() {
    const form = document.getElementById('form');

    if (!form.reportValidity()) {
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const id = Number(data.id);
    if (!id) {
        delete data.id;
    }
    data.salary = salaryMask.typedValue;

    if (!passportMask.masked.isComplete) {
        alert('Введите данные паспорта полностью');
        return;
    }

    if (!phoneMask.masked.isComplete) {
        alert('Введите телефон полностью');
        return;
    }

    if (data.department_id == "0") {
        alert('Выберите отдел');
        return;
    }

    if (data.position_id == "0") {
        alert('Выберите должность');
        return;
    }

    data.department_id = Number(data.department_id);
    data.position_id = Number(data.position_id);

    if (passportMask) {
        const passport = passportMask.unmaskedValue;
        data.passport = passport.slice(0, 4) + ' ' + passport.slice(4);
    }

    if (phoneMask) {
        data.phone = '+' + phoneMask.unmaskedValue;
    }

    if (!data.email) {
        data.email = null;
    }

    try {

        const response = await fetch(id ? `/api/employees/${id}` : `/api/employees`, {
            method: id ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.status == 201) {
            formDialog.close();
            // По хорошему надо бы рендерить не всю таблицу
            await renderTable();
        }
    } catch (err) {
        console.error(err);
    }
}

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
                                    <button class="dropdown-menu__item dropdown-menu__item__edit" onclick="renderEditForm(${employee.id})">Редактировать</button>
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

async function fillDepartments(select, addDefaultOption) {
    try {
        const departmentsResponse = await fetch(`/api/departments`);

        if (departmentsResponse.status != 200) {
            return;
        }

        const departmentsData = await departmentsResponse.json();
        const departmentsSelect = document.getElementById(select);
        departmentsSelect.innerHTML = '';

        if (addDefaultOption) {
            const option = document.createElement('option');
            option.value = 0;
            option.textContent = 'Не указано';
            option.selected = true;
            departmentsSelect.appendChild(option);
        }

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

async function fillPositions(select, addDefaultOption) {
    try {
        const positionsResponse = await fetch(`/api/positions`);

        if (positionsResponse.status != 200) {
            return;
        }

        const positionsData = await positionsResponse.json();
        const positionsSelect = document.getElementById(select);
        positionsSelect.innerHTML = '';

        if (addDefaultOption) {
            const option = document.createElement('option');
            option.value = 0;
            option.textContent = 'Не указано';
            option.selected = true;
            positionsSelect.appendChild(option);
        }

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

async function renderEditForm(id) {
    try {
        const employeeResponse = await fetch(`/api/employees/${id}`);

        if (employeeResponse.status != 200) {
            return;
        }

        const employee = await employeeResponse.json();

        if (employee != null) {
            await fillDepartments('form__departments-select', false);
            await fillPositions('form__positions-select', false);

            document.getElementById('form__title').textContent = "Редактирование сотрудника";
            document.getElementById('form__id').value = employee.id;
            document.getElementById('form__last-name').value = employee.last_name;
            document.getElementById('form__first-name').value = employee.first_name;
            document.getElementById('form__patronymic').value = employee.patronymic;
            document.getElementById('form__birth-date').value = employee.birth_date;
            passportMask.value = employee.passport;
            document.getElementById('form__address').value = employee.address;
            salaryMask.value = employee.salary;
            document.getElementById('form__hire-date').value = employee.hire_date;
            phoneMask.value = employee.phone;
            document.getElementById('form__email').value = employee.email;
            document.getElementById('form__departments-select').value = employee.Department.id;
            document.getElementById('form__positions-select').value = employee.Position.id;

            formDialog.showModal();
        }
    } catch (err) {
        console.error(err);
    }
}

async function renderAddForm() {
    await fillDepartments('form__departments-select', true);
    await fillPositions('form__positions-select', true);

    document.getElementById('form__id').value = '';
    document.getElementById('form').reset();
    document.getElementById('form__title').textContent = "Добавление сотрудника";

    formDialog.showModal();
}