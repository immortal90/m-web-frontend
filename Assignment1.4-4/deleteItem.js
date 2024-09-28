import {loadTables} from "./renderTable.js";

/**
 * Deletes an item based on the button click event
 *
 * @param {Event} event - The click event triggered by the delete button
 * @param {Object} configs - The configuration object containing table configurations
 * @returns {Promise<void>} - A promise that resolves after the item is deleted and tables are reloaded
 */
export const deleteItem = async (event, configs) => {
    const button = event.target;
    const id = button.getAttribute("data-id");

    const parentElement = button.closest('table').parentElement;
    const configKey = Object.keys(configs).find(key => configs[key].parent === `#${parentElement.id}`);
    const config = configs[configKey];

    const apiUrl = `https://mock-api.shpp.me/ikopach/${config.type}/${id}`;

    try {
        const response = await fetch(apiUrl, { method: 'DELETE' });

        if (response.ok) {
            console.log(`Item with id ${id} deleted successfully.`);
            await loadTables();
        } else {
            console.error("Failed to delete item:", response.status);
        }
    } catch (error) {
        console.error("Error during deletion:", error);
    }
};