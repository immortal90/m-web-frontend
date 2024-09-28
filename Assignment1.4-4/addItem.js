import { configs } from './configs.js';
import { openModal } from './modal.js';
import { createInputField } from './inputField.js';

/**
 * Handler for adding a new item
 *
 * @param {string} configKey - The configuration key that indicates which fields to add
 * @returns {Promise<void>} - A promise that resolves after the modal window is opened
 */
export const handleAddItem = async (configKey) => {
    const config = configs[configKey];
    const formFieldsContainer = document.getElementById('formFields');
    formFieldsContainer.innerHTML = '';

    config.columns.forEach(column => {
        if (column.input) {
            if (Array.isArray(column.input)) {
                column.input.forEach(inputConfig => {
                    formFieldsContainer.appendChild(createInputField(inputConfig, column.title, column.value));
                });
            } else {
                formFieldsContainer.appendChild(createInputField(column.input, column.title, column.value));
            }
        }
    });

    const addItemForm = document.getElementById('addItemForm');
    addItemForm.setAttribute('data-config', configKey);
    openModal();
};