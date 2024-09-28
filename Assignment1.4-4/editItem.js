import { configs } from './configs.js';
import { loadTables } from './renderTable.js';
import { createEditInputField } from "./inputField.js";

/**
 * Handles the click event on the edit button to enable editing of a table row
 *
 * @param {Event} event - The click event triggered by the edit button
 * @param {Object} originalData - The original data object containing items to be edited
 * @returns {Promise<void>} - A promise that resolves when the edit form is displayed
 */
export async function handleEditButtonClick(event, originalData) {
    const id = event.target.getAttribute("data-edit");
    const row = event.target.closest("tr");
    const item = originalData[id];
    row.innerHTML = '';
    const parentElement = row.closest('table').parentElement;
    const configKey = Object.keys(configs).find(key => configs[key].parent === `#${parentElement.id}`);
    const config = configs[configKey];

    config.columns.forEach(column => {
        const td = document.createElement("td");

        if (column.input) {
            if (Array.isArray(column.input)) {
                column.input.forEach(inputConfig => {
                    const inputField = createEditInputField(inputConfig, column.title, item);
                    td.appendChild(inputField);
                });
            } else {
                const inputField = createEditInputField(column.input, column.title, item);
                td.appendChild(inputField);
            }
        } else {
            td.innerHTML = typeof column.value === 'function' ? column.value(item, id) : item[column.value];
        }

        row.appendChild(td);
    });

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', async () => {
        await saveEditedItem(id, row, configs[configKey]);
    });

    const saveTd = document.createElement("td");
    saveTd.appendChild(saveButton);
    row.appendChild(saveTd);
}

/**
 * Saves the edited item back to the server
 *
 * @param {string} id - The ID of the item being edited
 * @param {HTMLElement} row - The table row containing the edited fields
 * @param {Object} config - The configuration object for the specific table
 * @returns {Promise<void>} - A promise that resolves after the item is updated
 */
async function saveEditedItem(id, row, config) {
    const updatedItem = {};
    const inputs = row.querySelectorAll('input, select');

    inputs.forEach(input => {
        updatedItem[input.name] = input.value;
    });

    updatedItem.price = parseInt(updatedItem.price, 10);
    updatedItem.title = updatedItem.Назва;
    updatedItem.name = updatedItem['Ім’я'];
    if (updatedItem.birthday) {
        updatedItem.birthday = new Date(updatedItem.birthday).toISOString();
    }
    console.log(updatedItem);

    if (updatedItem.price && isNaN(updatedItem.price)) {
        console.error("Price must be a valid number");
        return;
    }

    try {
        const response = await fetch(`${config.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedItem)
        });

        if (response.ok) {
            console.log('Item updated successfully');
            await loadTables();
        } else {
            const errorData = await response.json();
            console.error("Failed to update item:", errorData);
        }
    } catch (error) {
        console.error("Error updating item:", error);
    }
}
