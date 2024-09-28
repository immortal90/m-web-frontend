export const configs= {
    users: {
        parent: '#usersTable',
        type: 'users',
        columns: [
            { title: 'Ім’я', value: 'name', input: { type: 'text', placeholder: 'Введіть ім’я' } },
            { title: 'Прізвище', value: 'surname', input: { type: 'text', name: 'surname', label: 'Прізвище',
                    placeholder: 'Введіть прізвище' } },
            { title: 'Вік', value: (user) => getAge(user.birthday), input: { type: 'date', name: 'birthday',
                    label: 'Дата народження' } },
            { title: 'Фото', value: (user) => `<img src="${user.avatar}" alt="${user.name} ${user.surname}" 
                    width="100" height="100"/>`, input: { type: 'text', name: 'avatar', label: 'URL Фото',
                    placeholder: 'Введіть адресу зображення' } },
            { title: 'Дії', value: (product, id) => `<button data-id="${id}">Видалити</button>` },
            { title: 'Редагувати', value: (product, id) => `<button class="edit-btn" data-edit="${id}">Редагувати</button>` },
        ],
        apiUrl: "https://mock-api.shpp.me/ikopach/users"
    },
    products: {
        parent: '#productsTable',
        type: 'products',
        columns: [
            { title: 'Назва', value: 'title', input: { type: 'text', placeholder: 'Введіть ім’я' } },
            { title: 'Ціна', value: (product) => `${product.price} ${product.currency}`, input: [
                    { type: 'number', name: 'price', label: 'Ціна' , placeholder: 'Введіть ціну'},
                    { type: 'select', name: 'currency', label: 'Валюта', options: ['$', '€', '₴'], required: false }
                ] },
            { title: 'Колір', value: (product) => getColorLabel(product.color), input: { type: 'color', name: 'color' } },
            { title: 'Дії', value: (product, id) => `<button data-id="${id}">Видалити</button>` },
            { title: 'Редагувати', value: (product, id) => `<button class="edit-btn" data-edit="${id}">Редагувати</button>` },
        ],
        apiUrl: "https://mock-api.shpp.me/ikopach/products"
    }
};

/**
 * Calculates the age based on the provided birthday
 *
 * @param {string} birthday - The birthday in a date format
 * @returns {number} The calculated age
 */
export const getAge = (birthday) => {
    const birthDate = new Date(birthday);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

/**
 * Generates a color label represented as a div element with a background color
 *
 * @param {string} color - The color value in any valid CSS format
 * @returns {string} The HTML string for the color label
 */
export const getColorLabel = (color) => {
    return `<div style="background-color: ${color}; width: 50px; height: 20px; border: 1px solid #ccc;"></div>`;
};
