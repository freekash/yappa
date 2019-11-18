(function($) {
    "use strict";
    var newsmax_ruby_shortcodes = {
        accordion: function() {
            $('.shortcode-accordion').find('.accordion-item-title').click(function(e) {
                e.preventDefault();
                $(this).next().slideToggle(200);
                $(".accordion-item-content").not($(this).next()).slideUp(200);
            });
        },

        fullimg: function() {

            var single_wrapper = $('.single-post-outer');
            var sidebar = single_wrapper.find('.sidebar-wrap');
            if (sidebar.length > 0) {
                return false;
            }

            var full_image = single_wrapper.find('.shortcode-fullimg');
            if (full_image.length > 0) {

                var data = newsmax_ruby_shortcodes.fullimg_calc(single_wrapper);
                full_image.each(function() {

                    var full_image_el = $(this);

                    if (!full_image_el.hasClass('fullimg-loaded')) {
                        var full_image_el_img = full_image_el.find('img');

                        full_image_el.find('.alignnone').removeClass('alignnone');

                        full_image_el_img.css('width', data['img_width'], 'px !important;');
                        full_image_el_img.css('margin-left', data['img_margin'], 'px !important;');

                        setTimeout(function() {
                            full_image_el.addClass('is-img-show fullimg-loaded');
                        }, 100);

                        $(window).resize(function() {
                            data = newsmax_ruby_shortcodes.fullimg_calc(single_wrapper);
                            full_image_el_img.css('width', data['img_width'], 'px !important;');
                            full_image_el_img.css('margin-left', data['img_margin'], 'px !important;');
                        });
                    }
                })
            }
        },

        //call image
        fullimg_calc: function(wrapper) {
            var data = [];
            var wrapper_width = wrapper.outerWidth();
            var entry_width = wrapper.find('.single-post-body').outerWidth();

            data['img_width'] = wrapper_width;
            data['img_margin'] = -Math.abs((wrapper_width - entry_width) / 2);

            return data;
        }
    };

    $(document).ready(function() {
        newsmax_ruby_shortcodes.accordion();
    });

    $(window).load(function() {
        newsmax_ruby_shortcodes.fullimg();
    })
})(jQuery);