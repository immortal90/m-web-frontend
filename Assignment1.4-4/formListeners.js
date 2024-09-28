import { handleFormSubmit } from './handleFormSubmit.js';

/**
 * Adds an event listener to the form for handling submissions
 *
 * This function looks for a form with the ID 'addItemForm' and attaches
 * the `handleFormSubmit` function to the submit event
 */
export const addFormListener = () => {
    const form = document.getElementById('addItemForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
};

