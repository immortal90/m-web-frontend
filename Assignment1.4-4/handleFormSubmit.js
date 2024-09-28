import { configs } from './configs.js';
import { closeModal } from './modal.js';
import { loadTables } from './renderTable.js';

/**
 * Handles the submission of the form to add a new item
 *
 * This function prevents the default form submission behavior,
 * validates the input fields, constructs a new item object from
 * the form data, and sends a POST request to the API to add
 * the new item. It also handles form validation by checking
 * for required fields and provides visual feedback
 *
 * @param {Event} event - The submit event triggered by the form
 */
export const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newItem = {};
    let isValid = true;

    formData.forEach((value, key) => {
        if (key === 'price') {
            newItem[key] = parseInt(value, 10);
        } else {
            newItem[key] = value;
        }

        const inputField = event.target.elements[key];
        if (inputField && inputField.required && !value) {
            inputField.style.border = '2px solid red';
            isValid = false;
        } else {
            inputField.style.border = '';
        }
    });

    if (!isValid) {
        return;
    }

    const config = configs[event.target.getAttribute('data-config')];

    try {
        const response = await fetch(config.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        });

        if (response.ok) {
            console.log('Item added successfully');
            await loadTables();
            closeModal();
        } else {
            const errorData = await response.json();
            console.error("Failed to add item:", errorData);
        }
    } catch (error) {
        console.error("Error during adding:", error);
    }
};
