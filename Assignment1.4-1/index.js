async function DataTable(config, data) {
    const parentElement = document.querySelector(config1.parent);

    if (!parentElement) {
        console.error("Container for table not found");
        return;
    }

    if (!data || data.length === 0) {
        try {
            const response = await fetch(config.apiUrl);
            const json = await response.json();
            data = Object.values(json.data);
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return;
        }
    }

    const table = document.createElement("table");
    const headerRow = table.insertRow();
    const tbody = table.createTBody();

    config.columns.forEach(column => {
        const th = document.createElement("th");
        th.textContent = column.title;
        headerRow.appendChild(th);
    });

    const createTableCell = content => {
        const td = document.createElement("td");
        td.innerHTML = content;
        return td;
    };

    const createTableRow = user => {
        const tr = document.createElement("tr");
        config.columns.forEach(column => {
            const value = typeof column.value === 'function' ? column.value(user) : user[column.value];
            tr.appendChild(createTableCell(value));
        });
        return tr;
    };

    data.forEach(user => {
        const tr = createTableRow(user);
        tbody.appendChild(tr);
    });

    parentElement.appendChild(table);
}

function getAge(birthday) {
    const birthDate = new Date(birthday);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getColorLabel(color) {
    return `<div style="background-color: ${color}; width: 50px; height: 20px; border: 1px solid #ccc;"></div>`;
}

const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Ім’я', value: 'name'},
        {title: 'Прізвище', value: 'surname'},
        {title: 'Вік', value: (user) => getAge(user.birthday)},
        {title: 'Фото', value: (user) => `<img src="${user.avatar}" alt="${user.name} ${user.surname}" width="100" height="100"/>`}
    ],
    apiUrl: "https://mock-api.shpp.me/ikopach/users"
};

const config2 = {
    parent: '#productsTable',
    columns: [
        {title: 'Назва', value: 'title'},
        {title: 'Ціна', value: (product) => `${product.price} ${product.currency}`},
        {title: 'Колір', value: (product) => getColorLabel(product.color)},
    ],
    apiUrl: "https://mock-api.shpp.me/ikopach/products"
};

async function loadTables() {
    await DataTable(config2, []);
    await DataTable(config1, []);
}

loadTables();