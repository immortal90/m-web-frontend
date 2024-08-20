document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector('.news_images');
    new Masonry(grid, {
        itemSelector: '.image-container',
        columnWidth: '.image-container',
        percentPosition: true
    });
});
