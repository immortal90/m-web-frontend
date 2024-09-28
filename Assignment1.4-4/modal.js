/**
 * Opens the modal for adding an item by setting its display style to 'flex'.
 */
export const openModal = () => {
    const modal = document.getElementById('addItemModal');
    modal.style.display = 'flex';
};

/**
 * Closes the modal for adding an item by setting its display style to 'none'.
 */
export const closeModal = () => {
    const modal = document.getElementById('addItemModal');
    modal.style.display = 'none';
};


document.querySelector('.close').addEventListener('click', closeModal);