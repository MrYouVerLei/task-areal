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

function openInfoDialog() {
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

async function renderTable() {
    const table = document.getElementById('table');
    if (table != null) {
        const employees = await getAllEmployees();
        let html = '';
        employees.forEach(employee => {
            html += `<tr>
                        <td>${employee.fullName}</td>
                        <td>${employee.departmentName}</td>
                        <td>${employee.positionName}</td>
                        <td>${employee.status}</td>
                        <td>${employee.hireDate}</td>
                        <td>
                            <div class="menu-container">
                                <button class="menu-button" onclick="toggleMenu(event, this)">⋮</button>
                                <div class="dropdown-menu">
                                    <button class="dropdown-menu__item" onclick="openInfoDialog()">Подробнее</button>
                                    <button class="dropdown-menu__item">Редактировать</button>
                                    <button class="dropdown-menu__item dropdown-menu__item__delete">Уволить</button>
                                </div>
                            </div>
                        </td>
                    </tr>`;
        });
        table.innerHTML = html;
    }
}