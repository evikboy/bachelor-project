$('.show-replies-btn').on('click', function() {
    var $cur_btn = $(this)
    var $replies = $(this).parents('.suggest-type').next('.replies')

    if ($cur_btn.attr('class').indexOf('true') >= 0) {
        $replies.slideToggle(500)
        $('html, body').animate({scrollTop: $replies.offset().top - 50}, 500)

        $(this).removeClass('true');
        $(this).addClass('false')
        $(this).addClass('rotate')
        $(this).text('Схвати всі відповіді (2)')
    } else {
        $replies.slideToggle(500)

        $(this).removeClass('false')
        $(this).addClass('true')
        $(this).removeClass('rotate')
        $(this).text('Показати всі відповіді (2)')
    }
    
});