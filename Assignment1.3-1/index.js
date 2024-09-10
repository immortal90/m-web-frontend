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

    users.forEach(user => {
        const tr = document.createElement("tr");
        const tdId = document.createElement("td");
        tdId.textContent = user.id;
        tr.appendChild(tdId);
        const tdName = document.createElement("td");
        tdName.textContent = user.name;
        tr.appendChild(tdName);
        const tdSurname = document.createElement("td");
        tdSurname.textContent = user.surname;
        tr.appendChild(tdSurname);
        tbody.appendChild(tr);
    })

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