import { configs } from './configs.js';
import { handleAddItem } from './addItem.js';
import { deleteItem } from './deleteItem.js';
import { handleEditButtonClick } from './editItem.js';
import {createInputField} from "./inputField.js";

let originalUserData;
let originalProductData;

/**
 * Creates and populates a data table based on the provided configuration key and data
 * @param {string} configKey - The key to identify the configuration for the table
 * @param {Array} data - Optional data to populate the table; if not provided, data will be fetched from the API
 */
export const dataTable = async (configKey, data) => {
    const config = configs[configKey];
    if (!config) {
        console.error("Configuration not found");
        return;
    }

    const parentElement = document.querySelector(config.parent);
    if (!parentElement) {
        console.error("Container for table not found");
        return;
    }

    parentElement.innerHTML = '';

    const addButton = document.createElement('button');
    addButton.textContent = 'Додати';
    addButton.id = `add-${configKey}`;
    addButton.addEventListener('click', () => handleAddItem(configKey));
    parentElement.appendChild(addButton);

    let originalData;
    if (!data || data.length === 0) {
        try {
            const response = await fetch(config.apiUrl);
            const json = await response.json();
            originalData = json.data;

            // Зберігаємо дані в залежності від configKey
            if (configKey === "users") {
                originalUserData = originalData;
            } else if (configKey === "products") {
                originalProductData = originalData;
            }
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
    /**
     * Creates a table row for a given item.
     * @param {Object} item - The item data to populate the row.
     * @param {string} id - The ID of the item.
     * @param {boolean} isEditing - Indicates if the row is being edited.
     * @returns {HTMLTableRowElement} - The created table row.
     */
    const createTableRow = (item, id, isEditing = false) => {
        const tr = document.createElement("tr");

        config.columns.forEach(column => {
            let value = typeof column.value === 'function' ? column.value(item, id) : item[column.value];

            const td = document.createElement("td");
            if (isEditing && column.input) {
                if (Array.isArray(column.input)) {
                    column.input.forEach(inputConfig => {
                        const inputField = createInputField(inputConfig, column.title, column.value);
                        if (inputConfig.name in item) {
                            inputField.value = item[inputConfig.name] || '';
                        }
                        td.appendChild(inputField);
                    });
                } else {
                    const inputField = createInputField(column.input, column.title, column.value);
                    inputField.value = item[column.value] || '';
                    td.appendChild(inputField);
                }
            } else {
                td.innerHTML = value;
            }
            tr.appendChild(td);
        });

        return tr;
    };

    Object.keys(originalData).forEach(id => {
        const item = originalData[id];
        const tr = createTableRow(item, id);
        tbody.appendChild(tr);
    });

    parentElement.appendChild(table);

    const deleteButtons = parentElement.querySelectorAll("button[data-id]");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (event) => deleteItem(event, configs));
    });

    const editButtons = parentElement.querySelectorAll("button[data-edit]");
    editButtons.forEach(button => {
        button.addEventListener("click", (event) => handleEditButtonClick(event, configKey === "users" ? originalUserData : originalProductData));
    });
}

/**
 * Loads user and product tables by calling dataTable for both.
 */
export const loadTables = () => {
    dataTable("users");
    dataTable("products");
}

loadTables();



