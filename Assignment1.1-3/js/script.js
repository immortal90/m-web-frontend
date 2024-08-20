$(document).ready(function() {
    const owl = $(".owl-carousel");

    owl.owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: false
    });

    $('.arrow .back').click(function() {
        owl.trigger('next.owl.carousel');
    });
    $('.arrow .forward').click(function() {
        owl.trigger('prev.owl.carousel');
    });

    $('.paginator svg').click(function() {
        const index = $(this).data('index');
        owl.trigger('to.owl.carousel', [index, 300]);
    });

    owl.on('changed.owl.carousel', function(event) {
        const index = event.item.index;
        $('.paginator svg').removeClass('active');
        $('.paginator svg').eq(index).addClass('active');
    });
});
