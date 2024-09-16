function DataTable(config, data) {
    const parentElement = document.querySelector(config1.parent);

    if (!parentElement) {
        console.error("Container for table not found");
        return;
    }

    const table = document.createElement("table");
    const headerRow = table.insertRow();
    const tbody = table.createTBody();

    config1.columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.title;
        headerRow.appendChild(th);
    });

    const createTableCell = content => {
        const td = document.createElement("td");
        td.textContent = content;
        return td;
    };

    const createTableRow = user => {
        const tr = document.createElement("tr");
        tr.appendChild(createTableCell(user.id));
        tr.appendChild(createTableCell(user.name));
        tr.appendChild(createTableCell(user.surname));
        return tr;
    };

    const addRowToTable = (tbody, user) => {
        const tr = createTableRow(user);
        tbody.appendChild(tr);
    };

    users.forEach(user => addRowToTable(tbody, user));

    parentElement.appendChild(table);
}

const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: 'age'},
    ]
};

const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкін', age: 15},
];

DataTable(config1, users);