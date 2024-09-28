/**
 * Creates a new input field based on the provided configuration
 *
 * @param {Object} inputConfig - The configuration for the input field
 * @param {string} columnTitle - The title of the column associated with the input
 * @param {string} columnValue - The value of the column to populate the input
 * @returns {HTMLDivElement} The container element holding the input field and its label
 */
export const createInputField = (inputConfig, columnTitle, columnValue) => {
    const inputElement = createInputElement(inputConfig, columnTitle, columnValue);
    return createInputContainer(inputConfig, columnTitle, inputElement);
};

/**
 * Creates an editable input field based on the provided configuration and item data
 *
 * @param {Object} inputConfig - The configuration for the input field.
 * @param {string} columnTitle - The title of the column associated with the input
 * @param {Object} item - The item data used to populate the input field
 * @returns {HTMLDivElement} The container element holding the editable input field and its label
 */
export const createEditInputField = (inputConfig, columnTitle, item) => {
    const inputElement = createInputElement(inputConfig, columnTitle, columnTitle, item);
    return createInputContainer(inputConfig, columnTitle, inputElement);
};

/**
 * Creates an input element based on the input configuration
 *
 * @param {Object} inputConfig - The configuration for the input field
 * @param {string} columnTitle - The title of the column associated with the input
 * @param {string} columnValue - The value of the column to populate the input
 * @param {Object} [item=null] - The item data used to populate the input field
 * @returns {HTMLInputElement|HTMLSelectElement} The created input element (input or select)
 */
const createInputElement = (inputConfig, columnTitle, columnValue, item = null) => {
    const input = document.createElement(inputConfig.type === 'select' ? 'select' : 'input');
    input.name = inputConfig.name || columnValue || columnTitle;

    if (inputConfig.type === 'select') {
        inputConfig.options.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.textContent = optionValue;
            if (item && item[inputConfig.name] === optionValue) {
                option.selected = true;
            }
            input.appendChild(option);
        });
    } else {
        input.type = inputConfig.type || 'text';
        if (inputConfig.placeholder) {
            input.placeholder = inputConfig.placeholder;
        }
        if (item && item[inputConfig.name] !== undefined) {
            input.value = item[inputConfig.name];
        } else if(item && item.name){
            input.value = item.name;
        } else if(item && item.title){
            input.value = item.title;
        } else {
            input.value = '';
        }
    }

    input.required = inputConfig.required !== false;
    return input;
};

/**
 * Creates a container element for the input field, including a label
 *
 * @param {Object} inputConfig - The configuration for the input field
 * @param {string} columnTitle - The title of the column associated with the input
 * @param {HTMLElement} inputElement - The input element to be included in the container
 * @returns {HTMLDivElement} The container element holding the input field and its label.
 */
const createInputContainer = (inputConfig, columnTitle, inputElement) => {
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = inputConfig.label || inputConfig.title || columnTitle;
    div.appendChild(label);
    div.appendChild(inputElement);
    return div;
};