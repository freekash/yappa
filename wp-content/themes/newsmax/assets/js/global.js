/*--------------------------------------------------------------
 NEWSMAX MAN SCRIPT
 --------------------------------------------------------------*/
(function($) {
    "use strict";

    var newsmax_ruby = {

        window: $(window),
        html: $('html, body'),
        document: $(document),
        body: $('body'),
        touch: Modernizr.touch,
        ios: /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
        window_last_pos: 0,
        direction: '',
        ajax_filter_item_last_width: [],
        waypoint_item: [],
        animation_speed: 350,
        slider_next: '<span class="ruby-slider-next ruby-slider-nav"><i class="icon-simple icon-arrow-right"></i></span>',
        slider_prev: '<div class="ruby-slider-prev ruby-slider-nav"><i class="icon-simple icon-arrow-left"></i></div>',
        slider_popup_next: '<div class="ruby-slider-popup-next ruby-slider-popup-nav"><i class="icon-simple icon-arrow-right"></i></div>',
        slider_popup_prev: '<div class="ruby-slider-popup-prev ruby-slider-popup-nav"><i class="icon-simple icon-arrow-left"></i></div>',
        ajax: {},
        resize_timer: '',
        get_rtl: function() {
            return newsmax_ruby.body.hasClass('rtl');
        },
        auto_play: function() {
            return newsmax_ruby.body.data('slider_autoplay');
        },
        play_speed: function() {
            return newsmax_ruby.body.data('slider_play_speed');
        },

        document_ready: function() {

            newsmax_ruby.enable_sticky_navigation();
            newsmax_ruby.breaking_news();
            newsmax_ruby.navbar_search_popup();
            newsmax_ruby.block_dropdown_filter();
            newsmax_ruby.site_date();
            newsmax_ruby.topbar_search_popup();
            newsmax_ruby.off_canvas_toggle();
            newsmax_ruby.calc_small_menu();
            newsmax_ruby.enable_smooth_scroll();
            newsmax_ruby.tooltips();
            newsmax_ruby.back_to_top();
            newsmax_ruby.fw_block_1_slider();
            newsmax_ruby.fw_block_2_slider();
            newsmax_ruby.fw_block_3_slider();
            newsmax_ruby.fw_block_4_slider();
            newsmax_ruby.fw_block_5_slider();
            newsmax_ruby.fw_block_6_slider();
            newsmax_ruby.fw_block_7_slider();
            newsmax_ruby.fw_block_8_slider();
            newsmax_ruby.fw_block_9_slider();
            newsmax_ruby.fw_block_10_slider();
            newsmax_ruby.fw_block_11_slider();
            newsmax_ruby.fw_block_12_slider();
            newsmax_ruby.hs_slider_1();
            newsmax_ruby.hs_slider_2();
            newsmax_ruby.widget_instagram_popup();
            newsmax_ruby.ajax_data_term();
            newsmax_ruby.ajax_header_search();
            newsmax_ruby.ajax_dropdown_filter();
            newsmax_ruby.ajax_pagination();
            newsmax_ruby.ajax_loadmore();
            newsmax_ruby.ajax_mega_cat_sub();
            newsmax_ruby.blog_pagination();

        },

        document_load: function() {
            newsmax_ruby.window.load(function() {
                newsmax_ruby.body.addClass('ruby-js-loaded');
            });
        },

        document_reload: function() {

            newsmax_ruby.site_smooth_display();
            newsmax_ruby.body_refresh();
            newsmax_ruby.enable_sticky_sidebar();
            newsmax_ruby.block_popup_gallery();
            newsmax_ruby.post_thumbnail_gallery_popup();
            newsmax_ruby.post_thumbnail_video_popup();
            newsmax_ruby.iframe_playlist_autoplay();
            newsmax_ruby.post_thumbnail_gallery_slider();
            newsmax_ruby.post_thumbnail_gallery_grid();
            newsmax_ruby.iframe_responsive();
            newsmax_ruby.single_post_box_comment();
            newsmax_ruby.single_scroll_to_comment();
            newsmax_ruby.scroll_to_update_url();
            newsmax_ruby.single_post_background();
            newsmax_ruby.single_post_fullscreen();
            newsmax_ruby.single_post_video_popup();
            newsmax_ruby.review_progress_bar();
            newsmax_ruby.single_post_content_image_popup();
            newsmax_ruby.ajax_view_add();
            newsmax_ruby.ajax_view_count();
            newsmax_ruby.single_post_video_autoplay();
            newsmax_ruby.ajax_single_box_related();
            newsmax_ruby.ajax_single_box_related_video();
            newsmax_ruby.ajax_single_infinite();
            newsmax_ruby.ajax_video_playlist();
            newsmax_ruby.ajax_infinite_scroll();
            newsmax_ruby.blog_infinite();

        },

        document_resize: function() {
            newsmax_ruby.window.resize(function() {

                newsmax_ruby.calc_small_menu();
                clearTimeout(newsmax_ruby.resize_timer);
                newsmax_ruby.resize_timer = setTimeout(function() {
                    newsmax_ruby.block_dropdown_filter();
                }, 150);
            })
        },

        //site smooth scroll
        enable_smooth_scroll: function() {
            if (newsmax_ruby.body.hasClass('is-smooth-scroll')) {
                ruby_smooth_scroll();
            }
        },

        //single iframe responsive
        iframe_responsive: function() {
            var entry = $('.single-entry.entry');
            if (entry.length > 0) {
                entry.each(function() {
                    var entry_el = $(this);
                    if (!entry_el.hasClass('iframe-loaded')) {
                        entry_el.fitVids();
                        entry_el.addClass('iframe-loaded')
                    }
                })
            }
        },

        //get width of item
        get_width: function(item) {
            return item.width();
        },

        //site tooltips
        tooltips: function() {
            if (newsmax_ruby.body.hasClass('is-tooltips') && false === newsmax_ruby.ios) {
                if (newsmax_ruby.body.hasClass('is-tooltips-touch')) {
                    if ((false === newsmax_ruby.touch)) {
                        $('.tooltips').find('a').tipsy({ fade: true });
                    }
                } else {
                    $('.tooltips').find('a').tipsy({ fade: true });
                }
            }
        },

        //back top
        back_to_top: function() {
            if (newsmax_ruby.body.hasClass('is-back-top')) {
                if (newsmax_ruby.body.hasClass('is-back-top-touch')) {
                    if ((false === newsmax_ruby.touch)) {
                        $().UItoTop({
                            containerID: 'ruby-back-top',
                            easingType: 'easeOutQuart',
                            text: '<i class="icon-simple icon-arrow-up"></i>',
                            containerHoverID: 'ruby-back-top-inner',
                            scrollSpeed: 800
                        });
                    }
                } else {
                    $().UItoTop({
                        containerID: 'ruby-back-top',
                        easingType: 'easeOutQuart',
                        text: '<i class="icon-simple icon-arrow-up"></i>',
                        containerHoverID: 'ruby-back-top-inner',
                        scrollSpeed: 800
                    });
                }
            }
        },

        // off canvas toggle
        off_canvas_toggle: function() {

            var off_canvas_btn = $('.ruby-toggle');
            var btn_close = $('#ruby-off-canvas-close-btn');
            var site_mask = $('.site-mask');

            off_canvas_btn.click(function() {
                newsmax_ruby.body.toggleClass('mobile-js-menu');
                return false;
            });

            site_mask.click(function() {
                newsmax_ruby.body.toggleClass('mobile-js-menu');
                return false;
            });

            btn_close.click(function() {
                newsmax_ruby.body.toggleClass('mobile-js-menu');
                return false;
            });

            var off_canvas_nav = $('.off-canvas-nav-wrap');
            var off_canvas_nav_sub_a = off_canvas_nav.find('li.menu-item-has-children >a');
            off_canvas_nav_sub_a.append('<span class="explain-menu"><span class="explain-menu-inner"><i class="fa fa-angle-down" aria-hidden="true"></i></span></span>');
            var explain_mobile_menu = $('.explain-menu');
            explain_mobile_menu.click(function() {
                $(this).closest('.menu-item-has-children ').toggleClass('show-sub-menu');
                return false;
            });
        },

        calc_small_menu: function() {
            var small_menu = $('#ruby-small-menu');
            if (small_menu.length > 0) {
                var num_el = small_menu.find('.small-menu-inner').children().length;
                var menu_wrapper = small_menu.parents('.navbar-inner');
                if (menu_wrapper.length > 0) {
                    var wrapper_width = menu_wrapper.width();
                    if (parseInt(wrapper_width) < ( parseInt(num_el) + 1) * 215) {
                        small_menu.addClass('is-fw-small');
                        small_menu.css('width', wrapper_width);
                    } else {
                        small_menu.removeClass('is-fw-small');
                        small_menu.css('width', 'auto');
                    }
                }
            }
        },

        //breaking new
        breaking_news: function() {
            var wrapper = $('#ruby-breaking-news');
            if (wrapper.length > 0) {
                wrapper.on('init', function() {
                    wrapper.prev('.breaking-news-loader').fadeOut(400, function() {
                        $(this).remove();
                        wrapper.removeClass('slider-init');
                    });
                });
                wrapper.slick({
                    dots: false,
                    fade: true,
                    infinite: true,
                    autoplay: newsmax_ruby.auto_play(),
                    autoplaySpeed: newsmax_ruby.play_speed(),
                    speed: 0,
                    adaptiveHeight: true,
                    arrows: true,
                    rtl: newsmax_ruby.get_rtl(),
                    prevArrow: newsmax_ruby.slider_prev,
                    nextArrow: newsmax_ruby.slider_next
                });
            }
        },

        //navbar search popup
        navbar_search_popup: function() {
            $('#ruby-navbar-search-icon').magnificPopup({
                type: 'inline',
                preloader: false,
                focus: '#name',
                closeBtnInside: false,
                removalDelay: 500,
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = this.st.el.attr('data-effect');
                        if (newsmax_ruby.get_width(newsmax_ruby.window) < 768) {
                            this.st.focus = false;
                        }
                    }
                }
            });
        },

        //topbar search popup
        topbar_search_popup: function() {
            $('#ruby-topbar-search-icon').magnificPopup({
                type: 'inline',
                preloader: false,
                focus: '#name',
                closeBtnInside: false,
                removalDelay: 500,
                callbacks: {
                    beforeOpen: function() {
                        this.st.mainClass = this.st.el.attr('data-effect');
                        if (newsmax_ruby.get_width(newsmax_ruby.window) < 768) {
                            this.st.focus = false;
                        }
                    }
                }
            });
        },

        //site date
        site_date: function() {
            if (newsmax_ruby.body.hasClass('is-date-js')) {
                var topbar_date = newsmax_ruby.body.find('.topbar-date');
                if (topbar_date.length > 0) {
                    var timestamp = Math.floor(new Date().getTime() / 1000);
                    var data = newsmax_ruby.ajax_cache.get('current_date_cache');

                    if ('undefined' != data) {
                        topbar_date.find('span').html(data);
                        topbar_date.removeClass('is-hidden');
                    } else {
                        $.ajax({
                            type: 'POST',
                            url: newsmax_ruby_ajax_url,
                            data: {
                                action: 'newsmax_ruby_date_data',
                                timestamp: timestamp
                            },
                            success: function(data) {
                                data = $.parseJSON(data);
                                topbar_date.find('span').html(data);
                                topbar_date.removeClass('is-hidden');
                                newsmax_ruby.ajax_cache.set('current_date_cache', data);
                            }
                        });
                    }
                }
            }
        },


        /**-------------------------------------------------------------------------------------------------------------------------
         * sticky navigation
         */
        enable_sticky_navigation: function() {
            if (newsmax_ruby.body.hasClass('is-navbar-sticky')) {

                var top_spacing = 0;
                if (newsmax_ruby.body.hasClass('admin-bar')) {
                    top_spacing = 32;
                }

                var sticky_menu = $('.navbar-outer');
                var menu_wrap = sticky_menu.find('.navbar-wrap');
                var menu_height = menu_wrap.height();

                //set outer height
                sticky_menu.css('min-height', menu_height);
                newsmax_ruby.window.resize(function() {
                    menu_height = menu_wrap.height();
                    sticky_menu.css('min-height', menu_height);
                });

                //enable sticky
                if (newsmax_ruby.body.hasClass('is-smart-sticky')) {
                    menu_wrap.sticky({
                        className: 'is-stick',
                        topSpacing: top_spacing,
                        smartSticky: true,
                        menuOuter: '.navbar-outer',
                        zIndex: 9800
                    });
                } else {
                    menu_wrap.sticky({
                        className: 'is-stick',
                        topSpacing: top_spacing,
                        zIndex: 9800
                    });
                }

                //smart sticky
                if (newsmax_ruby.body.hasClass('is-smart-sticky')) {
                    menu_wrap.on('sticky-start', function() {

                        var flag_up = true;
                        var flag_down = true;
                        menu_height = menu_wrap.height();

                        newsmax_ruby.window.bind('scroll.ruby_menu_sticky', function() {
                            window.requestAnimFrame(function() {

                                var scroll_top = newsmax_ruby.window.scrollTop();
                                if (scroll_top !== newsmax_ruby.window_last_pos) {
                                    if (scroll_top > newsmax_ruby.window_last_pos) {
                                        newsmax_ruby.direction = 'down';
                                    } else {
                                        newsmax_ruby.direction = 'up';
                                    }
                                    newsmax_ruby.window_last_pos = scroll_top;
                                }

                                if (true === flag_down && 'down' == newsmax_ruby.direction) {

                                    menu_wrap.css({
                                        '-webkit-transform': 'translate3d(0px,' + '-' + menu_height + 'px, 0px)',
                                        '-moz-transform': 'translate3d(0px,' + '-' + menu_height + 'px, 0px)',
                                        'transform': 'translate3d(0px,' + '-' + menu_height + 'px, 0px)',
                                        '-webkit-transition': 'transform 0.05s',
                                        '-moz-transition': 'transform 0.05s',
                                        'transition': 'transform 0.05s'
                                    });

                                    flag_down = false;
                                    flag_up = true;
                                }

                                if (true === flag_up && 'up' == newsmax_ruby.direction) {
                                    menu_wrap.css({
                                        '-webkit-transform': 'translate3d(0px, 0px, 0px)',
                                        '-moz-transform': 'translate3d(0px, 0px, 0px)',
                                        'transform': 'translate3d(0px, 0px, 0px)',
                                        '-webkit-transition': 'transform 0.07s',
                                        '-moz-transition': 'transform 0.07s',
                                        'transition': 'transform 0.07s'
                                    });

                                    flag_down = true;
                                    flag_up = false;
                                }
                            })
                        });
                    });

                    menu_wrap.on('sticky-end', function() {
                        newsmax_ruby.window.unbind('scroll.ruby_menu_sticky');
                        menu_wrap.css({
                            '-webkit-transform': 'none',
                            '-moz-transform': 'none',
                            'transform': 'none',
                            '-webkit-transition': 'none',
                            '-moz-transition': 'none',
                            'transition': 'none'
                        });
                    });
                }
            }
        },

        //sticky sidebar
        enable_sticky_sidebar: function() {
            newsmax_ruby.window.load(function() {
                var sidebars = $('.ruby-sidebar-sticky');
                if (sidebars.length > 0) {
                    ruby_sticky_sidebar.sticky_sidebar(sidebars);

                    if (true == newsmax_ruby.ios || (newsmax_ruby.get_width(newsmax_ruby.window) < 1024 && true == newsmax_ruby.touch)) {
                        ruby_sticky_sidebar.is_enable = false;
                    } else {
                        if (newsmax_ruby.get_width(newsmax_ruby.window) < 768) {
                            ruby_sticky_sidebar.is_enable = false;
                        }
                        newsmax_ruby.window.resize(function() {
                            if (newsmax_ruby.get_width(newsmax_ruby.window) >= 768) {
                                ruby_sticky_sidebar.is_enable = true;
                            }
                        })
                    }
                }
            })
        },

        //instagram popup
        widget_instagram_popup: function() {
            var instagram_wrapper = $('.instagram-content-wrap');
            if (instagram_wrapper.length > 0 && instagram_wrapper.hasClass('is-instagram-popup')) {
                instagram_wrapper.find('a').magnificPopup({
                    type: 'image',
                    closeOnContentClick: true,
                    closeBtnInside: false,
                    fixedContentPos: true,
                    removalDelay: 400,
                    focus: '#name',
                    disableOn: 992,
                    image: {
                        verticalFit: true
                    },
                    gallery: {
                        enabled: true
                    },
                    callbacks: {
                        beforeOpen: function() {
                            this.st.mainClass = this.st.el.attr('data-effect');
                        }
                    }
                });
            }
        },

        //ajax filter
        block_dropdown_filter: function() {

            var block_ajax_filter_wrap = $('.block-ajax-filter-wrap');
            if (block_ajax_filter_wrap.length > 0) {
                block_ajax_filter_wrap.each(function() {

                    var block_ajax_filter = $(this);
                    var block_ajax_filter_id = block_ajax_filter.attr('id');
                    var dropdown_counter = 1;
                    var list_counter = 1;
                    var header_inner = block_ajax_filter.parent('.block-header-inner');
                    var header_title = header_inner.find('.block-title');
                    var block_ajax_filter_max_width = newsmax_ruby.get_width(header_inner) - newsmax_ruby.get_width(header_title);
                    var block_ajax_filter_width = newsmax_ruby.get_width(block_ajax_filter);

                    if (block_ajax_filter_width > block_ajax_filter_max_width * 0.5) {

                        while ((block_ajax_filter_width > block_ajax_filter_max_width * 0.5) && (dropdown_counter < 200)) {
                            var dropdown_flag = newsmax_ruby.block_dropdown_filter_add_el(block_ajax_filter);

                            if (0 == dropdown_flag) {
                                break;
                            }
                            block_ajax_filter_width = newsmax_ruby.get_width(block_ajax_filter);
                            dropdown_counter++;
                        }
                    } else {

                        if ('undefined' == typeof newsmax_ruby.ajax_filter_item_last_width[block_ajax_filter_id]) {
                            newsmax_ruby.block_filter_hide_more(block_ajax_filter);
                        } else {

                            var ajax_filter_el_last_width = newsmax_ruby.ajax_filter_item_last_width[block_ajax_filter_id];
                            while ((block_ajax_filter_width + ajax_filter_el_last_width < block_ajax_filter_max_width * 0.6) && (list_counter < 200)) {
                                var list_flag = newsmax_ruby.block_list_filter_add_el(block_ajax_filter);

                                if (0 == list_flag) {
                                    break;
                                }

                                block_ajax_filter_width = newsmax_ruby.get_width(block_ajax_filter);
                                list_counter++;
                            }
                        }
                    }

                    //touch action
                    newsmax_ruby.block_filter_touch_toggle(block_ajax_filter);
                })
            }
        },

        block_dropdown_filter_add_el: function(block_ajax_filter) {
            var block_ajax_filter_id = block_ajax_filter.attr('id');
            var list_ajax_filter = block_ajax_filter.find('.ajax-filter-list');
            var dropdown_ajax_filter = block_ajax_filter.find('.ajax-filter-dropdown-list');
            var list_ajax_filter_last_el = list_ajax_filter.children().last();

            if (list_ajax_filter_last_el.length > 0) {

                newsmax_ruby.ajax_filter_item_last_width[block_ajax_filter_id] = list_ajax_filter_last_el.width();
                newsmax_ruby.block_filter_show_more(block_ajax_filter);
                list_ajax_filter_last_el.detach().prependTo(dropdown_ajax_filter);
                return 1;
            } else {
                return 0;
            }
        },

        block_list_filter_add_el: function(block_ajax_filter) {
            var block_ajax_filter_id = block_ajax_filter.attr('id');
            var list_ajax_filter = block_ajax_filter.find('.ajax-filter-list');
            var dropdown_ajax_filter = block_ajax_filter.find('.ajax-filter-dropdown-list');
            var dropdown_ajax_filter_first_el = dropdown_ajax_filter.children().first();

            //add to list
            if (dropdown_ajax_filter_first_el.length > 0) {
                dropdown_ajax_filter_first_el.css('opacity', '.1');
                dropdown_ajax_filter_first_el.detach().appendTo(list_ajax_filter);

                setTimeout(function() {
                    if (dropdown_ajax_filter.children().length == 0) {
                        newsmax_ruby.block_filter_hide_more(block_ajax_filter)
                    }
                    dropdown_ajax_filter_first_el.css('opacity', '1');
                }, 50);

                newsmax_ruby.ajax_filter_item_last_width[block_ajax_filter_id] = dropdown_ajax_filter_first_el.width();

                return 1;
            } else {
                return 0;
            }
        },

        //hide if over width
        block_filter_hide_more: function(block_ajax_filter) {
            var block_ajax_filter_btn = block_ajax_filter.find('.ajax-filter-dropdown');
            if (block_ajax_filter_btn.css('display') == 'inline-block') {
                block_ajax_filter_btn.hide();
            }
        },

        block_filter_show_more: function(block_ajax_filter) {
            var block_ajax_filter_btn = block_ajax_filter.find('.ajax-filter-dropdown');
            if (block_ajax_filter_btn.css('display') == 'none') {
                block_ajax_filter_btn.show(350);
            }
        },

        block_filter_touch_toggle: function(block_ajax_filter) {
            if (true === newsmax_ruby.touch) {
                var dropdown = block_ajax_filter.find('.ajax-filter-dropdown');
                dropdown.addClass('is-touch');
                dropdown.on('click touch', function() {
                    dropdown.toggleClass('touch-active');
                });
            }
        },


        //Classic slider gallery
        post_thumbnail_gallery_slider: function() {
            var gallery_slider = $('.post-thumb-gallery-slider');
            if (gallery_slider.length > 0) {
                gallery_slider.each(function() {
                    var gallery_slider_el = $(this);
                    if (!gallery_slider_el.hasClass('gallery-loaded')) {
                        gallery_slider_el.on('init', function() {
                            gallery_slider_el.imagesLoaded(function() {
                                gallery_slider_el.prev('.slider-loader').fadeOut(200, function() {
                                    $(this).remove();
                                    gallery_slider_el.removeClass('slider-init');
                                    gallery_slider_el.addClass('gallery-loaded');
                                });
                            });
                        });

                        gallery_slider_el.slick({
                            dots: true,
                            centerMode: false,
                            autoplay: newsmax_ruby.auto_play(),
                            speed: newsmax_ruby.animation_speed,
                            adaptiveHeight: false,
                            arrows: true,
                            rtl: newsmax_ruby.get_rtl(),
                            lazyLoad: 'progressive',
                            prevArrow: newsmax_ruby.slider_prev,
                            nextArrow: newsmax_ruby.slider_next
                        });
                    }
                });
            }
        },

        //post classic gallery grid
        post_thumbnail_gallery_grid: function() {
            var gallery_grid = $('.post-thumb-gallery-grid');
            if (gallery_grid.length > 0) {
                gallery_grid.each(function() {
                    var gallery_grid_el = $(this);
                    if (!gallery_grid_el.hasClass('gallery-loaded')) {

                        //set row height
                        var row_height = 240;
                        var max_row_height = 300;

                        var post_wrap = gallery_grid_el.parents('.single-post-wrap');
                        if (post_wrap.hasClass('single-post-gallery-grid-1')) {
                            row_height = 170;
                            max_row_height = 250;
                        }

                        gallery_grid_el.fadeIn(200).justifiedGallery({
                            lastRow: 'justify',
                            rowHeight: row_height,
                            maxRowHeight: max_row_height,
                            rel: 'gallery',
                            waitThumbnailsLoad: true,
                            margins: 4,
                            captions: false,
                            refreshTime: 250,
                            randomize: false,
                            imagesAnimationDuration: 200,
                            sizeRangeSuffixes: { lt100: "", lt240: "", lt320: "", lt500: "", lt640: "", lt1024: "" }
                        }).on('jg.complete', function() {

                            gallery_grid_el.imagesLoaded(function() {
                                gallery_grid_el.removeClass('slider-init');
                                gallery_grid_el.addClass('gallery-loaded');

                                gallery_grid_el.prev('.slider-loader').fadeOut(200, function() {
                                    $(this).remove();
                                    gallery_grid_el.justifiedGallery('norewind');

                                    setTimeout(function() {
                                        Waypoint.refreshAll();
                                    }, 100);

                                });
                            });
                        });
                    }
                });
            }
        },


        //thumbnail gallery popup
        post_thumbnail_gallery_popup: function() {
            var thumbnail_popup = $('.ruby-thumb-galley-popup');
            if (thumbnail_popup.length > 0) {
                thumbnail_popup.each(function() {

                    var thumbnail_popup_el = $(this);
                    var thumbnail_popup_el_index = thumbnail_popup_el.data('post_index');
                    if ('undefined' == typeof thumbnail_popup_el_index) {
                        thumbnail_popup_el_index = 0;
                    }

                    thumbnail_popup_el.magnificPopup({
                        type: 'inline',
                        preloader: false,
                        focus: '#name',
                        closeBtnInside: false,
                        removalDelay: 500,
                        callbacks: {
                            beforeOpen: function() {
                                this.st.mainClass = this.st.el.attr('data-effect');
                                if (newsmax_ruby.get_width(newsmax_ruby.window) < 992) {
                                    this.st.focus = false;
                                }
                            },
                            open: function() {
                                var popup_content = this.content;
                                var slider = popup_content.find('.popup-thumbnail-slider');
                                setTimeout(function() {
                                    newsmax_ruby.post_thumbnail_popup_gallery_slider(slider, thumbnail_popup_el_index);
                                }, 500);
                            },

                            beforeClose: function() {
                                var popup_content = this.content;
                                var slider = popup_content.find('.popup-thumbnail-slider');
                                if (slider.hasClass('slick-initialized')) {
                                    setTimeout(function() {
                                        slider.slick('unslick');
                                        slider.addClass('slider-init');
                                        slider.before('<div class="slider-loader"></div>');
                                    }, 500);
                                }
                            }
                        }
                    });
                });
            }
        },

        //slider on gallery popup
        post_thumbnail_popup_gallery_slider: function(gallery_slider, thumbnail_popup_el_index) {

            if (gallery_slider.hasClass('slick-initialized')) {
                gallery_slider.slick('unslick');
            }

            gallery_slider.on('init', function() {
                gallery_slider.imagesLoaded(function() {
                    gallery_slider.prev('.slider-loader').fadeOut(200, function() {
                        $(this).remove();
                        gallery_slider.removeClass('slider-init');
                    });
                });
            });

            gallery_slider.slick({
                dots: true,
                autoplay: newsmax_ruby.auto_play(),
                autoplaySpeed: newsmax_ruby.play_speed(),
                speed: newsmax_ruby.animation_speed,
                adaptiveHeight: false,
                infinite: true,
                arrows: true,
                rtl: newsmax_ruby.get_rtl(),
                initialSlide: thumbnail_popup_el_index,
                lazyLoad: 'progressive',
                prevArrow: newsmax_ruby.slider_popup_prev,
                nextArrow: newsmax_ruby.slider_popup_next
            });

        },

        post_thumbnail_video_popup: function() {
            var post_popup = $('.post-popup-video');
            if (post_popup.length > 0) {
                post_popup.each(function() {

                    var post_popup_el = $(this);
                    var post_thumb = post_popup_el.find('.post-thumb-outer');
                    var popup_src = post_popup_el.find('.popup-thumbnail-video-outer');

                    if (popup_src.length > 0) {
                        post_thumb.magnificPopup({
                            items: {
                                src: popup_src,
                                type: 'inline',
                                preloader: false,
                                removalDelay: 500
                            },
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.mainClass = 'mpf-ruby-effect';
                                }
                            }
                        });
                    }
                });
            }
        },


        iframe_playlist_autoplay: function() {
            var auto_play = $('.video-playlist-autoplay');
            if (auto_play.length > 0) {
                auto_play.each(function() {
                    var auto_play_el = $(this);
                    newsmax_ruby.waypoint_item['iframe'] = new Waypoint({
                        element: auto_play_el,
                        handler: function() {
                            var iframe = auto_play_el.find('iframe');
                            newsmax_ruby.iframe_autoplay_process(iframe);
                            auto_play_el.removeClass('video-playlist-autoplay');
                            this.destroy();
                        },
                        offset: '80%'
                    });
                })
            }
        },

        iframe_autoplay_process: function(item) {
            if (item.length > 0 && 'undefined' != item[0]) {
                var src = item[0].src;
                if (src.indexOf('?') > -1) {
                    item[0].src += "&autoplay=1";
                } else {
                    item[0].src += "?autoplay=1";
                }
            }
        },

        single_post_video_autoplay: function() {
            var auto_play = $('.is-feat-video-autoplay');
            if (auto_play.length > 0) {
                auto_play.each(function() {
                    var auto_play_el = $(this);
                    var iframe = auto_play_el.find('iframe');
                    newsmax_ruby.iframe_autoplay_process(iframe);
                    auto_play_el.removeClass('is-feat-video-autoplay');
                })
            }
        },

        //single video popup on thumbnail
        single_post_video_popup: function() {
            var video_btn = $('.single-post-popup-video-btn');
            if (video_btn.length > 0) {
                video_btn.each(function() {
                    var video_btn_el = $(this);
                    var video_popup_el = video_btn_el.parents('.post-format-wrap').next('.single-post-popup-video');
                    if (video_popup_el.length > 0) {
                        var iframe_thumb = video_popup_el.find('.post-thumb');
                        var iframe_thumb_html = iframe_thumb.html();

                        video_btn_el.magnificPopup({
                            items: {
                                src: video_popup_el,
                                type: 'inline',
                                showCloseBtn: false,
                                preloader: false,
                                removalDelay: 500
                            },
                            callbacks: {
                                beforeOpen: function() {
                                    this.st.mainClass = 'mpf-ruby-effect is-video-popup';
                                },
                                open: function() {
                                    var iframe = iframe_thumb.find('iframe');
                                    newsmax_ruby.iframe_autoplay_process(iframe);
                                },
                                close: function() {
                                    //reset iframe
                                    iframe_thumb.html(iframe_thumb_html);
                                }
                            }
                        });
                    }
                })
            }
        },

        //single comment box
        single_post_box_comment: function() {
            var comment_btn = $('.box-comment-btn');
            if (comment_btn.length > 0) {
                comment_btn.each(function() {
                    var comment_btn_el = $(this);
                    var comment_btn_wrap = comment_btn_el.parent('.box-comment-btn-wrap');
                    var comment_content = comment_btn_wrap.next('.box-comment-content');
                    var meta_comment = comment_btn_el.parents('.single-post-wrap').find('.single-post-meta-info .meta-info-comment');
                    var comment_wrap = comment_btn_wrap.parent('.single-post-box-comment');

                    comment_btn_el.on('click', function() {
                        newsmax_ruby.single_post_show_box_comment(comment_btn_wrap, comment_content);
                        return false;
                    });

                    meta_comment.find('a').on('click', function() {
                        newsmax_ruby.html.scrollTop(comment_wrap.offset().top);
                        newsmax_ruby.single_post_show_box_comment(comment_btn_wrap, comment_content);
                    });

                })
            }
        },

        //scroll to comment
        single_scroll_to_comment: function() {
            var comment_btn = $('.box-comment-btn');
            if (comment_btn.length > 0) {
                var hash = window.location.hash;
                if ('#respond' == hash || '#comment' == hash.substring(0, 8)) {
                    var comment_btn_wrap = comment_btn.parent('.box-comment-btn-wrap');
                    var comment_content = comment_btn_wrap.next('.box-comment-content');
                    var comment_wrap = comment_btn_wrap.parent('.single-post-box-comment');

                    newsmax_ruby.html.scrollTop(comment_wrap.offset().top);
                    newsmax_ruby.single_post_show_box_comment(comment_btn_wrap, comment_content);
                }
            }
        },

        single_post_show_box_comment: function(comment_btn_wrap, comment_content) {
            comment_btn_wrap.fadeOut(200, function() {
                comment_btn_wrap.remove();
            });
            comment_content.delay(220).show().animate({ opacity: 1 }, 200);
        },


        //single post fullwidth featured image backstretch
        single_post_background: function() {
            var single_post_background = $('.is-single-background');
            if (single_post_background.length > 0) {
                single_post_background.each(function() {
                    var single_post_background_el = $(this);
                    var holder_outer = single_post_background_el.find('.single-post-feat-bg-outer');
                    var holder = holder_outer.find('.single-post-feat-bg');
                    if (holder.length > 0) {
                        var image = holder_outer.find('.single-post-feat-image img');
                        var image_src = image.attr('src');
                        holder.addClass('backstretch-perload');
                        holder.backstretch(image_src, { centeredY: true });
                        holder.on("backstretch.after", function() {
                            setTimeout(function() {
                                holder.removeClass('backstretch-perload');
                            }, 100);
                            newsmax_ruby.single_post_parallax(single_post_background_el);
                        });
                    }
                })
            }
        },

        //single post fullscreen featured image backstretch
        single_post_fullscreen: function() {
            var single_post_fullscreen = $('.is-single-fullscreen');
            if (single_post_fullscreen.length > 0) {
                single_post_fullscreen.each(function() {
                    var single_post_fullscreen_el = $(this);
                    var holder_outer = single_post_fullscreen_el.find('.single-post-feat-screen-outer');
                    var holder_outer_top = holder_outer.offset().top;
                    var holder_outer_height = newsmax_ruby.window.height() - holder_outer.offset().top;
                    holder_outer.css('height', holder_outer_height);

                    var holder = holder_outer.find('.single-post-feat-screen');
                    holder.addClass('backstretch-perload');
                    holder.css('top', -holder_outer_top);

                    //resize window
                    newsmax_ruby.window.resize(function() {
                        holder_outer_top = holder_outer.offset().top;
                        holder_outer_height = newsmax_ruby.window.height() - holder_outer.offset().top;
                        holder_outer.css('height', holder_outer_height);
                        holder.css('top', -holder_outer_top);
                    });

                    if (holder.length > 0) {
                        var image = holder_outer.find('.single-post-feat-image img');
                        var image_src = image.attr('src');
                        holder.backstretch(image_src, { centeredY: true });
                        holder.on("backstretch.after", function() {
                            setTimeout(function() {
                                $('.header-wrap').css('background', 'none');
                                holder.removeClass('backstretch-perload');
                            }, 100);
                            newsmax_ruby.single_post_parallax(single_post_fullscreen_el);
                        });
                    }
                })
            }
        },

        //single parallax post
        single_post_parallax: function(wrapper) {
            if (wrapper.hasClass('is-single-parallax')) {

                var top_offset = 0;
                var single_parallax_el = wrapper.find('.single-post-feat-bg');

                if (single_parallax_el.length < 1) {
                    single_parallax_el = wrapper.find('.single-post-feat-screen');
                }

                //setup top offset
                if (newsmax_ruby.body.hasClass('.single-infinite-loaded')) {
                    top_offset = wrapper.offset().top;
                }

                var bottom_offset = single_parallax_el.offset().top + single_parallax_el.outerHeight(true);
                var image = single_parallax_el.find('.backstretch img');
                newsmax_ruby.window.scroll(function() {
                    window.requestAnimFrame(function() {
                        var scroll_top = newsmax_ruby.window.scrollTop();
                        if (scroll_top > top_offset && scroll_top < bottom_offset) {
                            var scrolling_range = Math.abs(scroll_top - top_offset);
                            newsmax_ruby.parallax_animation(image, scrolling_range);
                        }
                    });
                });
            }
        },

        //parallax animation
        parallax_animation: function(image, scrolling_range) {
            var parallax_move = -Math.round((scrolling_range) / 6);
            var translate = 'translate3d(0px,' + -parallax_move + 'px, 0px)';
            image.css({
                'transform': translate,
                '-webkit-transform': translate,
                '-moz-transform': translate,
                '-ms-transform': translate,
                '-o-transform': translate
            });
        },


        single_post_content_image_popup: function() {
            if (newsmax_ruby.body.hasClass('is-entry-image-popup')) {
                var single_entry = $('.single .entry');
                if (single_entry.length > 0) {
                    single_entry.each(function() {
                        var single_entry_el = $(this);
                        var single_popup_last_item = null;

                        single_entry_el.find('a img').each(function() {
                            var image_wrap = $(this).parent();
                            var image_link = image_wrap.attr('href');
                            if (image_link.indexOf('wp-content/uploads') > 0) {
                                image_wrap.addClass('single-popup');
                            }
                        });

                        single_entry_el.magnificPopup({
                            type: 'image',
                            removalDelay: 500,
                            mainClass: 'mfp-fade single-image-popup',
                            delegate: '.single-popup',
                            closeOnContentClick: true,
                            showCloseBtn: false,
                            gallery: {
                                enabled: true
                            },
                            callbacks: {
                                change: function(item) {
                                    single_popup_last_item = item.el;
                                    newsmax_ruby.scroll_view(item.el);
                                },
                                beforeClose: function() {
                                    if (single_popup_last_item) {
                                        newsmax_ruby.scroll_view(single_popup_last_item);
                                    }
                                }
                            }
                        });
                    });
                }
            }
        },


        scroll_view: function(element) {

            if (true === newsmax_ruby.touch) {
                return;
            }
            newsmax_ruby.html.stop();
            var destination = element.offset().top;
            destination = destination - 150;

            newsmax_ruby.html.animate(
                { scrollTop: destination },
                {
                    duration: 500,
                    easing: 'easeInOutQuart'
                }
            );
        },

        //update title
        scroll_to_update_url: function() {
            var single_infinite = $('#single-post-infinite');
            if (single_infinite.length > 0) {
                var single_outer = single_infinite.find('.single-post-outer');
                if (single_outer.length > 0) {
                    single_outer.each(function() {
                        var single_outer_el = $(this);
                        var url = single_outer_el.data('post_url');
                        var title = single_outer_el.data('post_title');
                        newsmax_ruby.waypoint_item['update_url'] = new Waypoint.Inview({
                            element: single_outer_el,
                            enter: function() {
                                newsmax_ruby.update_url(url, title);
                            }
                        });
                    })
                }
            }
        },

        //update URL
        update_url: function(url, title) {
            if (window.location.href !== url) {
                if (url !== '') {
                    history.replaceState(null, null, url);
                    document.title = title;
                }
                newsmax_ruby.update_ga(url);
            }
        },

        //update GA
        update_ga: function(url) {
            if (typeof _gaq !== 'undefined' && _gaq !== null) {
                _gaq.push(['_trackPageview', url]);
            } else if (typeof ga !== 'undefined') {
                var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/,
                    pathname = reg.exec(url)[1];
                ga('send', 'pageview', pathname);
            }
        },

        review_progress_bar: function() {
            var progress_bar = $('.score-bar');

            progress_bar.each(function() {
                var that = $(this);
                that.waypoint({
                        handler: function() {
                            that.removeClass('score-remove');
                            that.addClass('score-animation');
                        },
                        offset: '90%'
                    }
                )
            });
        },

        site_smooth_display: function() {
            if (newsmax_ruby.body.hasClass('is-site-smooth-display')) {
                newsmax_ruby.animated_image();
            }
        },

        animated_image: function() {
            $('.ruby-animated-image').each(function() {
                var that = $(this);
                if (!that.hasClass('animated-loaded')) {
                    var delay = 50 + (that.offset().left / 3.5);
                    that.waypoint({
                        handler: function() {
                            setTimeout(function() {
                                that.addClass('ruby-animation animated-loaded');
                            }, delay);
                        },
                        offset: '100%',
                        triggerOnce: true
                    });
                }
            })
        },

        //block gallery popup
        block_popup_gallery: function() {

            var post_gallery = $('.post-gallery');
            post_gallery.each(function() {

                var post_gallery_el = $(this);
                var post_gallery_el_index = post_gallery_el.data('post_gallery_index');
                if ('undefined' == typeof post_gallery_el_index) {
                    post_gallery_el_index = 0;
                }

                post_gallery_el.magnificPopup({
                    type: 'inline',
                    preloader: false,
                    focus: '#name',
                    closeBtnInside: true,
                    disableOn: 992,
                    removalDelay: 500,
                    callbacks: {
                        beforeOpen: function() {
                            this.st.mainClass = this.st.el.attr('data-effect');
                            if (newsmax_ruby.get_width(newsmax_ruby.window) < 768) {
                                this.st.focus = false;
                            }
                        },
                        open: function() {
                            var popup_content = this.content;
                            var post_slider = popup_content.find('.popup-post-gallery-slider');
                            if (post_slider.length > 0) {
                                post_slider.each(function() {
                                    var post_slider_el = $(this);
                                    newsmax_ruby.block_popup_gallery_post_slider(post_slider_el);
                                })
                            }

                            var slider = popup_content.find('.popup-slider-gallery');
                            setTimeout(function() {
                                newsmax_ruby.block_popup_gallery_slider(slider, post_gallery_el_index);
                            }, 200);
                        },

                        beforeClose: function() {
                            var popup_content = this.content;
                            var slider = popup_content.find('.popup-slider-gallery');
                            if (slider.hasClass('slick-initialized')) {
                                setTimeout(function() {
                                    slider.slick('unslick');
                                    slider.addClass('slider-init');
                                    slider.before('<div class="slider-loader"></div>');
                                }, 500);
                            }
                        }
                    }
                });
            });
        },


        block_popup_gallery_slider: function(slider, post_gallery_el_index) {

            slider.on('init', function() {
                slider.imagesLoaded(function() {
                    setTimeout(function() {
                        slider.prev('.slider-loader').fadeOut(200, function() {
                            $(this).remove();
                            slider.removeClass('slider-init');
                        });
                    }, 500);
                });
            });


            slider.slick({
                dots: true,
                autoplay: false,
                speed: newsmax_ruby.animation_speed,
                initialSlide: post_gallery_el_index,
                adaptiveHeight: false,
                arrows: true,
                swipe: false,
                swipeToSlide: false,
                touchMove: false,
                infinite: false,
                rtl: newsmax_ruby.get_rtl(),
                prevArrow: newsmax_ruby.slider_popup_prev,
                nextArrow: newsmax_ruby.slider_popup_next
            });
        },

        //slider for post gallery
        block_popup_gallery_post_slider: function(post_slider) {
            var post_slider_nav = post_slider.next('.slider-nav');

            if (post_slider.hasClass('slick-initialized')) {
                post_slider.slick('unslick');
            }
            if (post_slider_nav.hasClass('slick-initialized')) {
                post_slider_nav.slick('unslick');
            }

            post_slider.slick({
                dots: true,
                infinite: true,
                autoplay: newsmax_ruby.auto_play(),
                autoplaySpeed: newsmax_ruby.play_speed(),
                speed: newsmax_ruby.animation_speed,
                adaptiveHeight: false,
                arrows: true,
                rtl: newsmax_ruby.get_rtl(),
                lazyLoad: 'progressive',
                asNavFor: post_slider_nav,
                prevArrow: newsmax_ruby.slider_prev,
                nextArrow: newsmax_ruby.slider_next
            });

            post_slider_nav.slick({
                slidesToShow: 6,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
                rtl: newsmax_ruby.get_rtl(),
                adaptiveHeight: false,
                asNavFor: post_slider,
                centerMode: false,
                focusOnSelect: true
            });
        },

        //block sliders
        hs_slider_1: function() {
            var slider = $('.hs-block-15-slider');
            if (slider.length > 0) {
                slider.each(function() {
                    var slider_el = $(this);
                    var slider_el_nav = slider_el.next('.hs-block-15-slider-nav');

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el_nav.on('init', function() {
                        slider_el_nav.imagesLoaded(function() {
                            slider_el_nav.removeClass('slider-init');
                        });
                    });

                    slider_el.slick({
                        dots: false,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        rtl: newsmax_ruby.get_rtl(),
                        asNavFor: slider_el_nav,
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });

                    slider_el_nav.slick({
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: false,
                        rtl: newsmax_ruby.get_rtl(),
                        asNavFor: slider_el,
                        centerMode: false,
                        focusOnSelect: true
                    });
                });
            }
        },

        hs_slider_2: function() {
            var slider = $('.hs-block-16-slider');
            if (slider.length > 0) {
                slider.each(function() {
                    var slider_el = $(this);

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_1_slider: function() {
            var slider = $('.fw-block-1-slider');
            if (slider.length > 0) {
                slider.each(function() {
                    var slider_el = $(this);
                    slider_el.imagesLoaded(function() {
                        slider_el.prev('.slider-loader').fadeOut(200, function() {
                            $(this).remove();
                            slider_el.removeClass('slider-init');
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_2_slider: function() {
            var slider = $('.fw-block-2-slider');
            if (slider.length > 0) {
                slider.each(function() {
                    var slider_el = $(this);
                    slider_el.imagesLoaded(function() {
                        slider_el.prev('.slider-loader').fadeOut(200, function() {
                            $(this).remove();
                            slider_el.removeClass('slider-init');
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_3_slider: function() {
            var slider = $('.fw-block-3-slider');
            if (slider.length > 0) {
                slider.each(function() {
                    var slider_el = $(this);
                    slider_el.imagesLoaded(function() {
                        slider_el.prev('.slider-loader').fadeOut(200, function() {
                            $(this).remove();
                            slider_el.removeClass('slider-init');
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_4_slider: function() {
            var slider = $('.fw-block-4-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);

                    slider_el.imagesLoaded(function() {
                        slider_el.prev('.slider-loader').fadeOut(200, function() {
                            $(this).remove();
                            slider_el.removeClass('slider-init');
                        });
                    });

                    slider_el.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_5_slider: function() {
            var slider = $('.fw-block-5-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);

                    slider_el.imagesLoaded(function() {
                        slider_el.prev('.slider-loader').fadeOut(200, function() {
                            $(this).remove();
                            slider_el.removeClass('slider-init');
                        });
                    });

                    slider_el.slick({
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1
                                }
                            }
                        ]
                    });
                });
            }
        },

        fw_block_6_slider: function() {
            var slider = $('.fw-block-6-slider');
            if (slider.length > 0) {

                var padding_1 = '400px';
                var padding_2 = '280px';
                var padding_3 = '215px';

                if (newsmax_ruby.body.hasClass('is-site-boxed')) {
                    padding_1 = '150px';
                    padding_2 = '150px';
                    padding_3 = '150px';
                }

                slider.each(function() {

                    var slider_el = $(this);

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el.slick({
                        centerMode: true,
                        infinite: true,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        centerPadding: padding_1,
                        dots: true,
                        rtl: newsmax_ruby.get_rtl(),
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next,
                        responsive: [
                            {
                                breakpoint: 1600,
                                settings: {
                                    centerMode: true,
                                    dots: true,
                                    arrows: true,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerPadding: padding_2
                                }
                            },
                            {
                                breakpoint: 1400,
                                settings: {
                                    dots: true,
                                    centerMode: true,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerPadding: padding_3
                                }
                            },
                            {
                                breakpoint: 1200,
                                settings: {
                                    dots: true,
                                    arrows: true,
                                    centerMode: true,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerPadding: '180px'
                                }
                            },
                            {
                                breakpoint: 992,
                                settings: {
                                    dots: true,
                                    arrows: true,
                                    centerMode: true,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerPadding: '120px'

                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    dots: true,
                                    centerMode: true,
                                    arrows: false,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerPadding: '40px'
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    dots: true,
                                    arrows: false,
                                    centerMode: true,
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    centerPadding: '10px'
                                }
                            }
                        ]
                    });
                });
            }
        },

        fw_block_7_slider: function() {
            var slider = $('.fw-block-7-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_8_slider: function() {
            var slider = $('.fw-block-8-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_9_slider: function() {
            var slider = $('.fw-block-9-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_10_slider: function() {
            var slider = $('.fw-block-10-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);
                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_11_slider: function() {
            var slider = $('.fw-block-11-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el.slick({
                        dots: true,
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });
                });
            }
        },

        fw_block_12_slider: function() {
            var slider = $('.fw-block-12-slider');
            if (slider.length > 0) {
                slider.each(function() {

                    var slider_el = $(this);
                    var slider_el_nav = slider_el.next('.slider-nav');

                    slider_el.on('init', function() {
                        slider_el.imagesLoaded(function() {
                            slider_el.prev('.slider-loader').fadeOut(200, function() {
                                $(this).remove();
                                slider_el.removeClass('slider-init');
                            });
                        });
                    });

                    slider_el_nav.on('init', function() {
                        slider_el_nav.imagesLoaded(function() {
                            slider_el_nav.removeClass('slider-init');
                        });
                    });

                    slider_el.slick({
                        infinite: true,
                        autoplay: newsmax_ruby.auto_play(),
                        autoplaySpeed: newsmax_ruby.play_speed(),
                        speed: newsmax_ruby.animation_speed,
                        adaptiveHeight: false,
                        arrows: true,
                        dots: false,
                        fade: true,
                        rtl: newsmax_ruby.get_rtl(),
                        asNavFor: slider_el_nav,
                        prevArrow: newsmax_ruby.slider_prev,
                        nextArrow: newsmax_ruby.slider_next
                    });

                    slider_el_nav.slick({
                        slidesToShow: 6,
                        slidesToScroll: 1,
                        arrows: false,
                        rtl: newsmax_ruby.get_rtl(),
                        asNavFor: slider_el,
                        centerMode: false,
                        focusOnSelect: true,
                        responsive: [
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 5
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 4
                                }
                            }
                        ]
                    });
                });
            }
        },


        ajax_cache: {

            //set data
            data: {},

            get: function(id) {
                return newsmax_ruby.ajax_cache.data[id];
            },
            set: function(id, data) {
                newsmax_ruby.ajax_cache.remove(id);
                newsmax_ruby.ajax_cache.data[id] = data;
            },
            remove: function(id) {
                delete newsmax_ruby.ajax_cache.data[id];
            },
            exist: function(id) {
                return newsmax_ruby.ajax_cache.data.hasOwnProperty(id) && newsmax_ruby.ajax_cache.data[id] !== null;
            }
        },

        ajax_data_term: function() {
            $('.ruby-block-wrap').each(function() {
                var block = $(this);
                var block_id = block.attr('id');

                if ('undefined' != typeof block_id) {
                    newsmax_ruby.ajax[block_id + '_category_id'] = block.data('category_id');
                    newsmax_ruby.ajax[block_id + '_category_ids'] = block.data('category_ids');
                    newsmax_ruby.ajax[block_id + '_tags'] = block.data('tags');
                    newsmax_ruby.ajax[block_id + '_orderby'] = block.data('orderby');
                }

                newsmax_ruby.ajax_pagination_check(block);
                newsmax_ruby.ajax_loadmore_check(block);
                newsmax_ruby.ajax_infinite_scroll_check(block);
            })
        },

        ajax_reinitiate_function: function() {

            newsmax_ruby.html.off();
            newsmax_ruby.document.off();
            newsmax_ruby.window.trigger('load');
            newsmax_ruby.document_reload();
        },

        //refreshAll
        body_refresh: function() {
            newsmax_ruby.body.imagesLoaded(function() {
                newsmax_ruby.body.removeClass('is-holder');
                setTimeout(function() {
                    Waypoint.refreshAll();
                }, 50);
            })
        },

        ajax_header_search: function() {

            var delay = (function() {
                var timer = 0;
                return function(callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            var search_result_wrapper = $('.header-search-result');
            $('#ruby-search-input').keyup(function() {
                var param = $(this).val();

                delay(function() {
                    if (param) {
                        search_result_wrapper.fadeIn(300).html('<div class="video-loader"></div>');
                        var data = {
                            action: 'newsmax_ruby_ajax_search',
                            s: param
                        };
                        $.post(newsmax_ruby_ajax_url, data, function(data_response) {
                            data_response = $.parseJSON(data_response);
                            search_result_wrapper.hide().empty().css('height', 'auto').html(data_response).css('height', search_result_wrapper.height()).fadeIn(300);
                        });
                    } else  search_result_wrapper.fadeOut(300, function() {
                        $(this).empty().css('height', 'auto');
                    });

                }, 450);
            })
        },


        ajax_block_data: function(block) {
            var param = {};
            param.block_id = block.data('block_id');
            param.block_name = block.data('block_name');
            param.posts_per_page = block.data('posts_per_page');
            param.ajax_dropdown = block.data('ajax_dropdown');
            param.block_page_max = block.data('block_page_max');
            param.block_page_current = block.data('block_page_current');
            param.category_id = block.data('category_id');
            param.category_ids = block.data('category_ids');
            param.orderby = block.data('orderby');
            param.authors = block.data('authors');
            param.tags = block.data('tags');
            param.post_format = block.data('post_format');
            param.offset = block.data('offset');
            param.excerpt = block.data('excerpt');
            param.excerpt_classic = block.data('excerpt_classic');
            param.block_style = block.data('block_style');
            param.thumb_position = block.data('thumb_position');
            param.summary_type = block.data('summary_type');
            param.share = block.data('share');
            param.cat_info = block.data('cat_info');
            param.meta_info = block.data('meta_info');

            return param;
        },

        // ajax dropdown filter
        ajax_dropdown_filter: function() {

            $('.ajax-filter-link').off('click').on('click', function(e) {

                e.preventDefault();
                e.stopPropagation();

                var filter_link = $(this);
                var block = filter_link.parents('.ruby-block-wrap');
                var block_id = block.attr('id');

                if (true == newsmax_ruby.ajax[block_id + '_processing']) {
                    return;
                }

                var filter_link_val = filter_link.data('ajax_filter_val');
                newsmax_ruby.ajax[block_id + '_processing'] = true;

                //disable other link
                block.find('.ajax-link').removeClass('is-active');
                block.find('.ajax-link').not(this).addClass('is-disable');
                filter_link.addClass('is-active');

                if (true === newsmax_ruby.touch) {
                    var dropdown = filter_link.parents('.ajax-filter-dropdown');
                    dropdown.removeClass('touch-active');
                }

                newsmax_ruby.ajax_animation_start(block);

                var param = newsmax_ruby.ajax_block_data(block);
                newsmax_ruby.ajax_dropdown_reset_param(block, param, filter_link_val);
                setTimeout(function() {
                    newsmax_ruby.ajax_dropdown_filter_process(block, param);
                }, 500);

            });
        },

        //reset param when filter
        ajax_dropdown_reset_param: function(block, param, filter_link_val) {

            param.block_page_current = 1;

            block.data('block_page_current', 1);
            var block_id = block.attr('id');

            if ('category' == param.ajax_dropdown) {

                if ('undefined' == typeof (newsmax_ruby.ajax[block_id + '_category_id'])) {
                    newsmax_ruby.ajax[block_id + '_category_id'] = 0;
                }

                if (0 == filter_link_val) {
                    param.category_id = newsmax_ruby.ajax[block_id + '_category_id'];
                    param.category_ids = newsmax_ruby.ajax[block_id + '_category_ids'];

                    block.data('category_id', newsmax_ruby.ajax[block_id + '_category_id']);
                    block.data('category_ids', newsmax_ruby.ajax[block_id + '_category_ids']);

                } else {

                    param.category_id = filter_link_val;
                    param.category_ids = 0;

                    block.data('category_id', filter_link_val);
                    block.data('category_ids', 0);
                }
            }

            if ('tag' == param.ajax_dropdown) {
                param.tags = filter_link_val;
                block.data('tags', filter_link_val);
            }

            if ('author' == param.ajax_dropdown) {
                param.authors = filter_link_val;
                block.data('authors', filter_link_val);
            }

            if ('popular' == param.ajax_dropdown) {

                block.data('orderby_term', block.data('orderby'));

                if ('featured' == filter_link_val) {
                    param.tags = 'featured';
                    param.orderby = 'date_post';
                    block.data('tags', 'featured');
                    block.data('orderby', 'date_post');
                }

                if ('popular' == filter_link_val) {
                    param.tags = null;
                    param.orderby = 'popular';
                    block.data('orderby', 'popular');
                    block.data('tags', '');
                }

                if ('popular_week' == filter_link_val) {
                    param.tags = null;
                    param.orderby = 'popular_week';
                    block.data('orderby', 'popular_week');
                    block.data('tags', '');
                }

                if (0 == filter_link_val) {
                    param.tags = newsmax_ruby.ajax[block_id + '_tags'];
                    param.orderby = newsmax_ruby.ajax[block_id + '_orderby'];
                    if ('undefined' == typeof newsmax_ruby.ajax[block_id + '_tags']) {
                        block.data('tags', '');
                    } else {
                        block.data('tags', newsmax_ruby.ajax[block_id + '_tags']);
                    }
                    block.data('orderby', newsmax_ruby.ajax[block_id + '_orderby']);
                }
            }
        },

        //request ajax dropdown
        ajax_dropdown_filter_process: function(block, param) {

            var param_cache = param;
            delete param_cache.block_page_max;
            var cache_id = JSON.stringify(param_cache);

            if (newsmax_ruby.ajax_cache.exist(cache_id)) {
                var data = newsmax_ruby.ajax_cache.get(cache_id);
                if ('undefined' != data.block_page_max) {
                    block.data('block_page_max', data.block_page_max);
                }

                newsmax_ruby.ajax_animation_end(block, data.content);
                return false;
            }

            $.ajax({
                type: 'POST',
                url: newsmax_ruby_ajax_url,
                data: {
                    action: 'newsmax_ruby_ajax_filter_data',
                    data: param
                },
                success: function(data) {
                    data = $.parseJSON(data);
                    if ('undefined' != data.block_page_max) {
                        block.data('block_page_max', data.block_page_max);
                    }
                    newsmax_ruby.ajax_cache.set(cache_id, data);
                    newsmax_ruby.ajax_animation_end(block, data.content);
                }
            });
        },


        ajax_animation_start: function(block) {

            var content_wrap = block.find('.block-content-wrap');
            var content_inner = content_wrap.find('.block-content-inner');
            var content_inner_height = content_inner.outerHeight();

            //add height for ajax
            content_inner.css('height', content_inner_height);

            //hide content
            content_inner.stop();
            $('.ajax-loader').remove();
            content_wrap.prepend('<div class="ajax-loader">');
            content_inner.addClass('is-overflow');
            content_inner.fadeTo('500', 0.05, 'easeInOutCubic');
        },


        //add animation and append
        ajax_animation_end: function(block, content) {

            block.delay(100).queue(function() {

                block.find('.ajax-link').removeClass('is-disable');
                block.find('.ajax-filter-more').removeClass('is-disable');

                var block_id = block.attr('id');
                var content_wrap = block.find('.block-content-wrap');
                var content_inner = content_wrap.find('.block-content-inner');

                content_wrap.find('.ajax-loader').remove();
                content_inner.stop();
                content_inner.html(content);

                content_inner.fadeTo(500, 1, function() {
                    newsmax_ruby.site_smooth_display();
                });

                content_inner.removeClass('is-overflow');

                if (block.hasClass('block-mega-menu')) {
                    setTimeout(function() {
                        content_inner.css('height', 'auto');
                    }, 250);
                } else {
                    setTimeout(function() {
                        content_inner.css('height', 'auto');
                    }, 100);
                }

                newsmax_ruby.ajax[block_id + '_processing'] = false;
                newsmax_ruby.ajax_pagination_check(block);
                newsmax_ruby.ajax_loadmore_check(block);
                newsmax_ruby.ajax_infinite_scroll_check(block);

                block.dequeue();
            });
        },


        // ajax pagination next prev
        ajax_pagination: function() {

            $('.ajax-pagination-link').off('click').on('click', function(e) {

                e.preventDefault();
                e.stopPropagation();

                var link = $(this);
                var block = link.parents('.ruby-block-wrap');
                var block_id = block.attr('id');

                if (true == newsmax_ruby.ajax[block_id + '_processing']) {
                    return;
                }
                newsmax_ruby.ajax[block_id + '_processing'] = true;

                block.find('.ajax-link').addClass('is-disable');
                block.find('.ajax-filter-more').addClass('is-disable');

                var pagination_link_val = link.data('ajax_pagination_link');
                var param = newsmax_ruby.ajax_block_data(block);
                newsmax_ruby.ajax_animation_start(block);
                setTimeout(function() {
                    newsmax_ruby.ajax_pagination_process(block, param, pagination_link_val);
                }, 200);
            });
        },

        ajax_pagination_process: function(block, param, pagination_link_val) {

            var page_current = param.block_page_current;
            if ('prev' == pagination_link_val) {
                --page_current;
            } else {
                ++page_current
            }

            param.block_page_next = page_current;

            var param_cache = param;
            delete param_cache.block_page_max;
            param_cache.block_page_current = page_current;

            var cache_id = JSON.stringify(param_cache);
            if (newsmax_ruby.ajax_cache.exist(cache_id)) {
                var data = newsmax_ruby.ajax_cache.get(cache_id);
                if ('undefined' != data.block_page_current) {
                    block.data('block_page_current', data.block_page_current);
                }
                newsmax_ruby.ajax_animation_end(block, data.content);
                return false;
            }

            $.ajax({
                type: 'POST',
                url: newsmax_ruby_ajax_url,
                data: {
                    action: 'newsmax_ruby_pagination_data',
                    data: param
                },

                success: function(data) {
                    data = $.parseJSON(data);
                    if ('undefined' != data.block_page_current) {
                        block.data('block_page_current', data.block_page_current);
                    }
                    newsmax_ruby.ajax_cache.set(cache_id, data);
                    newsmax_ruby.ajax_animation_end(block, data.content);
                }
            });
        },

        ajax_pagination_check: function(block) {

            var param = newsmax_ruby.ajax_block_data(block);

            if (param.block_page_max < 2) {
                block.find('.ajax-pagination-link').addClass('is-disable');
            }

            if (param.block_page_current >= param.block_page_max) {
                block.find('.ajax-next').addClass('is-disable');
            }

            if (param.block_page_current <= 1) {
                block.find('.ajax-prev').addClass('is-disable');
            }
        },


        ajax_loadmore: function() {
            $('.ajax-loadmore-link').off('click').on('click', function(e) {

                e.preventDefault();
                e.stopPropagation();

                var link = $(this);
                var block = link.parents('.ruby-block-wrap');
                var block_id = block.attr('id');
                if (true == newsmax_ruby.ajax[block_id + '_processing']) {
                    return;
                }
                var param = newsmax_ruby.ajax_block_data(block);
                if (param.block_page_current >= param.block_page_max) {
                    return;
                }
                newsmax_ruby.ajax[block_id + '_processing'] = true;
                var animation = link.next('.ajax-animation');
                link.animate({ opacity: 0 }, 200);
                setTimeout(function() {
                    animation.css({ 'display': 'block' });
                    animation.css({ 'visibility': 'visible' });
                    animation.delay(200).animate({ opacity: 1 }, 200);
                }, 100);
                setTimeout(function() {
                    newsmax_ruby.ajax_loadmore_process(block, param);
                }, 200);
            })
        },

        ajax_loadmore_process: function(block, param) {

            var block_id = block.attr('id');
            var page_current = param.block_page_current;
            var page_next = ++page_current;

            param.block_page_next = page_next;
            if (page_next <= param.block_page_max) {

                $.ajax({
                    type: 'POST',
                    url: newsmax_ruby_ajax_url,
                    data: {
                        action: 'newsmax_ruby_pagination_data',
                        data: param
                    },

                    success: function(data) {

                        data = $.parseJSON(data);

                        if ('undefined' != data.block_page_current) {
                            block.data('block_page_current', data.block_page_current);
                        }

                        block.find('.block-content-inner').append(data.content);
                        newsmax_ruby.ajax[block_id + '_processing'] = false;

                        setTimeout(function() {
                            newsmax_ruby.ajax_reinitiate_function();
                        }, 50);

                        if (data.block_page_current < param.block_page_max) {
                            var animation = block.find('.ajax-animation');
                            animation.css({ 'display': 'none' });
                            animation.css({ 'visibility': 'hidden' });
                            animation.css({ 'opacity': 0 });
                            block.find('.ajax-loadmore-link').delay(100).animate({ opacity: 1 }, 200);
                        } else {
                            block.find('.ajax-loadmore-link').hide();
                            block.find('.ajax-animation').hide();
                        }
                    }
                });
            }
        },

        ajax_loadmore_check: function(block) {

            var param = newsmax_ruby.ajax_block_data(block);
            if (param.block_page_current >= param.block_page_max || param.block_page_max <= 1) {
                block.find('.ajax-loadmore-link').hide();
                block.find('.ajax-animation').hide();
            } else {
                block.find('.ajax-loadmore-link').css('opacity', 1);
                block.find('.ajax-loadmore-link').show();
            }
        },

        //ajax pagination infinite scroll
        ajax_infinite_scroll: function() {

            var infinite_scroll = $('.ajax-infinite-scroll');
            if (infinite_scroll.length > 0) {

                infinite_scroll.each(function() {
                    var infinite_scroll_el = $(this);

                    if (!infinite_scroll_el.hasClass('is-disable')) {

                        var animation = infinite_scroll_el.find('.ajax-animation');
                        var block = infinite_scroll_el.parents('.ruby-block-wrap');
                        var block_id = block.attr('id');

                        if (infinite_scroll_el.length > 0) {
                            newsmax_ruby.waypoint_item['infinite_scroll'] = new Waypoint({
                                element: infinite_scroll_el,
                                handler: function(direction) {
                                    if ('down' == direction) {

                                        var param = newsmax_ruby.ajax_block_data(block);

                                        if (param.block_page_current >= param.block_page_max) {
                                            infinite_scroll_el.addClass('is-disable');
                                            return;
                                        }

                                        if (true == newsmax_ruby.ajax[block_id + '_processing']) {
                                            return;
                                        }

                                        newsmax_ruby.ajax[block_id + '_processing'] = true;

                                        setTimeout(function() {
                                            animation.css({ 'display': 'block' });
                                            animation.css({ 'visibility': 'visible' });
                                            animation.animate({ opacity: 1 }, 200);
                                        }, 100);

                                        setTimeout(function() {
                                            newsmax_ruby.ajax_loadmore_process(block, param);
                                            newsmax_ruby.waypoint_item['infinite_scroll'].destroy();
                                        }, 200);
                                    }
                                },
                                offset: '99%'
                            })
                        }
                    }
                });
            }
        },

        ajax_infinite_scroll_check: function(block) {
            var param = newsmax_ruby.ajax_block_data(block);
            if (param.block_page_current >= param.block_page_max || param.block_page_max <= 1) {
                block.find('.ajax-infinite-scroll').addClass('is-disable');
            } else {
                block.find('.ajax-infinite-scroll').removeClass('is-disable');
            }
        },

        ajax_mega_cat_sub: function() {

            var hover_timer;
            var cat_sub = $('.mega-category-menu .menu-item');

            cat_sub.hover(function(event) {
                event.stopPropagation();
                cat_sub = $(this);
                cat_sub.addClass('is-current-sub').siblings().removeClass('is-current-sub current-menu-item');
                var wrapper = cat_sub.parents('.mega-category-menu');
                var block = wrapper.find('.block-mega-menu-sub');
                hover_timer = setTimeout(function() {
                    newsmax_ruby.ajax_cat_sub_process(cat_sub, block);
                }, 200);
            }, function() {
                clearTimeout(hover_timer);
            });
        },

        ajax_cat_sub_process: function(cat_sub, block) {

            var block_id = block.attr('id');
            if (true == newsmax_ruby.ajax[block_id + '_processing']) {
                return;
            }
            newsmax_ruby.ajax[block_id + '_processing'] = true;

            var param = newsmax_ruby.ajax_block_data(block);
            param.category_id = cat_sub.data('mega_sub_filter');
            param.block_page_current = 1;
            param.block_name = 'newsmax_ruby_mega_block_cat_sub';
            param.posts_per_page = 4;

            block.data('category_id', param.category_id);
            block.data('block_page_current', param.block_page_current);

            newsmax_ruby.ajax_animation_start(block);
            setTimeout(function() {
                newsmax_ruby.ajax_dropdown_filter_process(block, param);
            }, 200);
        },


        ajax_video_playlist: function() {

            var video_iframe_nav = $('.video-playlist-iframe-nav-el .post-wrap');
            video_iframe_nav.off('click').on('click', function(e) {

                if ($(e.target).hasClass('post-title-link')) {
                    e.stopPropagation();
                } else {
                    e.preventDefault();
                    e.stopPropagation();

                    var data = '';
                    var post_nav = $(this).parents('.video-playlist-iframe-nav-el');
                    var post_id = post_nav.data('post_video_nav_id');
                    var playlist = post_nav.parents('.video-playlist-wrap');
                    var cache_id = 'video_playlist_' + post_id;

                    newsmax_ruby.ajax_video_playlist_animation_start(playlist);
                    if (newsmax_ruby.ajax_cache.exist(cache_id)) {

                        data = newsmax_ruby.ajax_cache.get(cache_id);
                        newsmax_ruby.ajax_video_playlist_process(playlist, data)
                    } else {

                        $.ajax({
                            type: 'POST',
                            url: newsmax_ruby_ajax_url,
                            data: {
                                action: 'newsmax_ruby_ajax_playlist_video',
                                post_id: post_id
                            },

                            success: function(data) {
                                data = $.parseJSON(data);
                                newsmax_ruby.ajax_cache.set(cache_id, data);
                                newsmax_ruby.ajax_video_playlist_process(playlist, data)
                            }
                        });
                    }
                    return false;
                }
            })
        },

        //ajax video playlist processing
        ajax_video_playlist_process: function(playlist, data) {

            var playlist_iframe = playlist.find('.video-playlist-iframe');
            //append html
            var iframe_outer = playlist.find('.video-playlist-iframe-el');
            iframe_outer.html(data);

            var iframe = iframe_outer.find('iframe');
            if (iframe.length > 0 && 'undefined' != iframe[0]) {
                var src = iframe[0].src;
                if (src.indexOf('?') > -1) {
                    iframe[0].src += "&autoplay=1";
                } else {
                    iframe[0].src += "?autoplay=1";
                }
            }

            setTimeout(function() {
                playlist_iframe.find('.video-loader').fadeTo(500, .05, function() {
                    $(this).remove();
                });
                playlist_iframe.css('height', 'auto');
            }, 100)
        },

        ajax_video_playlist_animation_start: function(playlist) {

            var playlist_iframe = playlist.find('.video-playlist-iframe');
            var iframe_outer = playlist.find('.video-playlist-iframe-el');
            var iframe_height = playlist_iframe.height();

            playlist_iframe.css('height', iframe_height);
            playlist_iframe.prepend('<div class="video-loader"></div>');
            iframe_outer.empty();
        },


        //related ajax
        ajax_single_box_related: function() {

            var related_scroll = $('.related-infinite-scroll');
            var related_loadmore = $('.related-loadmore-link');
            var param;
            var block;
            var animation;

            if (related_scroll.length > 0) {

                block = related_scroll.parents('.single-post-box-related');
                param = {};
                animation = related_scroll.find('.ajax-animation');

                param.related_layout = block.data('related_layout');
                param.related_page_current = block.data('related_page_current');
                param.related_page_max = block.data('related_page_max');
                param.related_post_id = block.data('related_post_id');
                param.sidebar_position = block.data('sidebar_position');
                param.cat_info = block.data('cat_info');
                param.meta_info = block.data('meta_info');
                param.share = block.data('share');

                newsmax_ruby.waypoint_item['related_scroll'] = new Waypoint({
                    element: related_scroll,
                    handler: function(direction) {
                        if ('down' == direction) {

                            if (param.related_page_current >= param.related_page_max) {
                                related_scroll.remove();
                                return;
                            }

                            if (true == newsmax_ruby.ajax['ajax_related_processing']) {
                                return;
                            }
                            newsmax_ruby.ajax['ajax_related_processing'] = true;

                            setTimeout(function() {
                                animation.css({ 'display': 'block' });
                                animation.css({ 'visibility': 'visible' });
                                animation.animate({ opacity: 1 }, 200);
                            }, 100);

                            setTimeout(function() {
                                newsmax_ruby.ajax_single_box_related_process(block, param);
                                newsmax_ruby.waypoint_item['related_scroll'].destroy();
                            }, 200);
                        }
                    },
                    offset: '99%'
                })
            } else {
                if (related_loadmore.length > 0) {

                    block = related_loadmore.parents('.single-post-box-related');
                    param = {};
                    animation = related_loadmore.find('.ajax-animation');

                    param.related_layout = block.data('related_layout');
                    param.related_page_current = block.data('related_page_current');
                    param.related_page_max = block.data('related_page_max');
                    param.related_post_id = block.data('related_post_id');
                    param.sidebar_position = block.data('sidebar_position');
                    param.cat_info = block.data('cat_info');
                    param.meta_info = block.data('meta_info');
                    param.share = block.data('share');

                    related_loadmore.off('click').on('click', function(e) {

                        e.preventDefault();
                        e.stopPropagation();

                        if (param.related_page_current >= param.related_page_max) {
                            related_scroll.remove();
                            return;
                        }

                        if (true == newsmax_ruby.ajax['ajax_related_processing']) {
                            return;
                        }
                        newsmax_ruby.ajax['ajax_related_processing'] = true;

                        var animation = related_loadmore.next('.ajax-animation');
                        related_loadmore.animate({ opacity: 0 }, 200);
                        setTimeout(function() {
                            animation.css({ 'display': 'block' });
                            animation.css({ 'visibility': 'visible' });
                            animation.delay(200).animate({ opacity: 1 }, 200);
                        }, 100);

                        setTimeout(function() {
                            newsmax_ruby.ajax_single_box_related_process(block, param);
                        }, 200);
                    })
                }
            }
        },

        //Ajax Video related
        ajax_single_box_related_process: function(block, param) {

            var page_current = param.related_page_current;
            var page_next = ++page_current;
            param.related_page_next = page_next;

            if (page_next <= param.related_page_max) {
                $.ajax({
                    type: 'POST',
                    url: newsmax_ruby_ajax_url,
                    data: {
                        action: 'newsmax_ruby_related_data',
                        data: param
                    },

                    success: function(data) {
                        data = $.parseJSON(data);
                        if ('undefined' != data.related_page_current) {
                            block.data('related_page_current', data.related_page_current);
                        }
                        block.find('.box-related-content').append(data.content);

                        setTimeout(function() {
                            newsmax_ruby.ajax_reinitiate_function();
                        }, 50);

                        newsmax_ruby.ajax['ajax_related_processing'] = false;
                        if (data.related_page_current < param.related_page_max) {
                            var animation = block.find('.ajax-animation');
                            animation.css({ 'display': 'none' });
                            animation.css({ 'visibility': 'hidden' });
                            animation.css({ 'opacity': 0 });
                            block.find('.related-loadmore-link').delay(100).animate({ opacity: 1 }, 200);

                        } else {
                            block.find('.ajax-animation').hide();
                            block.find('.related-loadmore').remove();
                        }
                    }
                });
            }
        },

        //single related video
        ajax_single_box_related_video: function() {

            var related_video_link = $('.ajax-pagination-video-link');
            related_video_link.off('click').on('click', function(e) {

                e.preventDefault();
                e.stopPropagation();

                if (true == newsmax_ruby.ajax['ajax_related_video_processing']) {
                    return;
                }

                var param = {};
                var block = related_video_link.parents('.single-post-box-related-video');
                param.related_page_max = block.data('related_page_max');
                param.posts_per_page = block.data('posts_per_page');
                param.related_post_id = block.data('related_post_id');

                var page_current = block.data('related_page_current');

                block.find('.ajax-link').addClass('is-disable');

                var related_video_link_val = $(this).data('ajax_pagination_link');
                if ('prev' == related_video_link_val) {
                    param.related_page_next = --page_current;
                } else {
                    param.related_page_next = ++page_current;
                }

                if ((param.related_page_next > 0) && (param.related_page_next <= param.related_page_max)) {
                    newsmax_ruby.ajax_animation_start(block);

                    setTimeout(function() {
                        newsmax_ruby.ajax_single_box_related_video_process(block, param);
                    }, 200);
                }

            })
        },

        ajax_single_box_related_video_process: function(block, param) {

            var param_cache = param;
            delete param_cache.related_page_current;
            var cache_id = JSON.stringify(param_cache);

            if (newsmax_ruby.ajax_cache.exist(cache_id)) {

                var data = newsmax_ruby.ajax_cache.get(cache_id);
                block.data('related_page_current', param.related_page_next);
                newsmax_ruby.ajax_single_box_related_video_end(block, data);

            } else {
                $.ajax({
                    type: 'POST',
                    url: newsmax_ruby_ajax_url,
                    data: {
                        action: 'newsmax_ruby_related_video_data',
                        data: param
                    },

                    success: function(data) {
                        data = $.parseJSON(data);

                        if ('undefined' != data.related_page_current) {
                            block.data('related_page_current', data.related_page_current);
                        }

                        newsmax_ruby.ajax_cache.set(cache_id, data);
                        newsmax_ruby.ajax_single_box_related_video_end(block, data);
                    }
                });
            }
        },

        ajax_single_box_related_video_end: function(block, data) {

            block.delay(100).queue(function() {

                block.find('.ajax-link').removeClass('is-disable');

                var content_wrap = block.find('.block-content-wrap');
                var content_inner = content_wrap.find('.block-content-inner');

                content_wrap.find('.ajax-loader').remove();
                content_inner.stop();
                content_inner.html(data.content);
                content_inner.fadeTo(500, 1);
                content_inner.removeClass('is-overflow');
                setTimeout(function() {
                    content_inner.css('height', 'auto');
                }, 100);

                //reload ajax
                newsmax_ruby.ajax_single_box_related_video_check(block);
                newsmax_ruby.ajax['ajax_related_video_processing'] = false;

                block.dequeue();
            });
        },

        ajax_single_box_related_video_check: function(block) {

            var page_max = block.data('related_page_max');
            var page_current = block.data('related_page_current');

            if (2 > page_current) {
                block.find('.ajax-prev').addClass('is-disable');
            }

            if (page_current >= page_max) {
                block.find('.ajax-next').addClass('is-disable');
            }
        },


        //! Ajax Single Infinite scrolling
        ajax_single_infinite: function() {
            var single_infinite = $('#single-post-infinite');
            if (single_infinite.length > 0) {
                var animation = single_infinite.next('.single-post-infinite-icon').find('.ajax-animation');
                newsmax_ruby.waypoint_item['single_infinite'] = new Waypoint({
                    element: single_infinite,
                    offset: 'bottom-in-view',
                    handler: function(direction) {
                        if ('down' == direction) {

                            if (true == newsmax_ruby.ajax['ajax_single_infinite_processing']) {
                                return;
                            }

                            $.ajax({
                                type: 'POST',
                                url: newsmax_ruby_ajax_url,
                                data: {
                                    action: 'newsmax_ruby_single_infinite_data',
                                    post_id: single_infinite.data('next_post_id')
                                },

                                beforeSend: function() {
                                    newsmax_ruby.ajax['ajax_single_infinite_processing'] = true;

                                    setTimeout(function() {
                                        animation.css({ 'display': 'block' });
                                        animation.css({ 'visibility': 'visible' });
                                        animation.animate({ opacity: 1 }, 200);
                                    }, 100);
                                },

                                success: function(data) {

                                    data = $.parseJSON(data);

                                    if ('undefined' != typeof( data.next_post_id) && null != data.content) {
                                        single_infinite.data('next_post_id', data.next_post_id);

                                        animation.css({ 'display': 'none' });
                                        animation.css({ 'visibility': 'hidden' });
                                        animation.animate({ opacity: 0 }, 200);

                                    } else {
                                        single_infinite.removeAttr('id');
                                        animation.remove();

                                        if (!newsmax_ruby.body.hasClass('single-infinite-loaded')) {
                                            newsmax_ruby.body.addClass('single-infinite-loaded');
                                        }
                                    }

                                    single_infinite.append(data.content);

                                    newsmax_ruby.waypoint_item['single_infinite'].destroy();
                                    newsmax_ruby.waypoint_item['update_url'].destroy();

                                    setTimeout(function() {
                                        newsmax_ruby.ajax['ajax_single_infinite_processing'] = false;
                                        newsmax_ruby.ajax_reinitiate_function();
                                    }, 50);
                                }
                            });
                        }
                    }
                });
            }
        },


        //ajax blog data
        ajax_blog_data: function(blog) {
            var param = {};
            param.blog_layout = blog.data('blog_layout');
            param.posts_per_page = blog.data('posts_per_page');
            param.blog_page_max = blog.data('blog_page_max');
            param.blog_page_current = blog.data('blog_page_current');
            param.excerpt = blog.data('excerpt');
            param.excerpt_classic = blog.data('excerpt_classic');
            param.classic_wide = blog.data('classic_wide');
            param.thumb_position = blog.data('thumb_position');
            param.summary_type = blog.data('summary_type');
            param.blog_1st_classic = blog.data('blog_1st_classic');
            param.share = blog.data('share');
            param.cat_info = blog.data('cat_info');
            param.meta_info = blog.data('meta_info');
            param.blog_sidebar_position = blog.data('blog_sidebar_position');
            param.blog_1st_classic_layout = blog.data('blog_1st_classic_layout');
            param.block_style = blog.data('block_style');
            param.author_id = blog.data('author_id');
            param.category_id = blog.data('category_id');
            param.tags = blog.data('tags');

            return param;
        },

        //blog pagination
        blog_pagination: function() {

            $('.blog-loadmore-link').off('click').on('click', function(e) {

                e.preventDefault();
                e.stopPropagation();

                var link = $(this);
                var blog_id = '#ruby-blog-listing';
                var blog = link.parents('.blog-inner').find(blog_id);
                var animation = link.next('.ajax-animation');

                if (true == newsmax_ruby.ajax['ruby-blog-listing_processing']) {
                    return;
                }

                newsmax_ruby.ajax['ruby-blog-listing_processing'] = true;

                link.animate({ opacity: 0 }, 200);
                var param = newsmax_ruby.ajax_blog_data(blog);

                setTimeout(function() {
                    animation.css({ 'display': 'block' });
                    animation.css({ 'visibility': 'visible' });
                    animation.animate({ opacity: 1 }, 200);
                }, 100);

                setTimeout(function() {
                    newsmax_ruby.blog_loadmore_process(blog, param);
                }, 200);
            });
        },


        // blog infinite scrolling
        blog_infinite: function() {
            var infinite_scroll = $('.pagination-infinite-scroll');
            var animation = infinite_scroll.find('.ajax-animation');
            var blog = infinite_scroll.parent('.blog-inner').find('#ruby-blog-listing');

            if (infinite_scroll.length > 0) {
                newsmax_ruby.waypoint_item['infinite_scroll'] = new Waypoint({

                    element: infinite_scroll,
                    handler: function(direction) {
                        if ('down' == direction) {

                            var param = newsmax_ruby.ajax_blog_data(blog);

                            if (param.blog_page_current >= param.blog_page_max) {
                                infinite_scroll.remove();
                                return;
                            }

                            if (true == newsmax_ruby.ajax['ruby-blog-listing_processing']) {
                                return;
                            }

                            newsmax_ruby.ajax['ruby-blog-listing_processing'] = true;
                            setTimeout(function() {
                                animation.css({ 'display': 'block' });
                                animation.css({ 'visibility': 'visible' });
                                animation.animate({ opacity: 1 }, 200);
                            }, 100);

                            setTimeout(function() {
                                newsmax_ruby.blog_loadmore_process(blog, param);
                                newsmax_ruby.waypoint_item['infinite_scroll'].destroy();
                            }, 150);
                        }
                    },
                    offset: '99%'
                })
            }
        },

        //ajax load more processing
        blog_loadmore_process: function(blog, param) {

            var page_current = param.blog_page_current;
            var page_next = ++page_current;
            var pagination_wrap = blog.parent('.blog-inner').find('.blog-pagination');

            //set next page
            param.blog_page_next = page_next;

            //ajax request
            if (page_next <= param.blog_page_max) {

                $.ajax({
                    type: 'POST',
                    url: newsmax_ruby_ajax_url,
                    data: {
                        action: 'newsmax_ruby_ajax_blog_data',
                        data: param
                    },

                    success: function(data) {
                        data = $.parseJSON(data);
                        if ('undefined' != data.blog_page_current) {
                            blog.data('blog_page_current', data.blog_page_current);
                        }
                        blog.append(data.content);
                        newsmax_ruby.ajax['ruby-blog-listing_processing'] = false;

                        setTimeout(function() {
                            newsmax_ruby.ajax_reinitiate_function();
                        }, 50);

                        if (data.blog_page_current < param.blog_page_max) {
                            var animation = pagination_wrap.find('.ajax-animation');
                            animation.css({ 'display': 'none' });
                            animation.css({ 'visibility': 'hidden' });
                            animation.css({ 'opacity': 0 });
                            pagination_wrap.find('.blog-loadmore-link').delay(100).animate({ opacity: 1 }, 200);

                        } else {
                            pagination_wrap.remove();
                        }
                    }
                });
            }
        },


        //ajax view
        ajax_view_count: function() {
            if (newsmax_ruby.body.hasClass('is-ajax-view')) {
                var ajax_view = $('.ruby-ajax-view');
                if (ajax_view.length > 0) {
                    ajax_view.each(function() {
                        var ajax_view_el = $(this);
                        var post_id = ajax_view_el.data('post_id');
                        ajax_view_el.css('width', ajax_view_el.width());
                        $.ajax({
                            type: 'POST',
                            url: newsmax_ruby_ajax_url,
                            data: {
                                action: 'newsmax_ruby_ajax_view_get',
                                post_id: post_id
                            },
                            success: function(data) {
                                data = $.parseJSON(data);
                                ajax_view_el.html(data);
                                ajax_view_el.css('width', 'auto');
                                ajax_view_el.removeClass('is-invisible');
                            }
                        });
                    })
                }
            }
        },

        //add post view
        ajax_view_add: function() {
            if (newsmax_ruby.body.hasClass('is-ajax-view')) {
                var ajax_view = $('.ruby-ajax-view-add');
                if (ajax_view.length > 0) {
                    ajax_view.each(function() {
                        var ajax_view_el = $(this);
                        var post_id = ajax_view_el.data('post_id');
                        $.ajax({
                            type: 'POST',
                            url: newsmax_ruby_ajax_url,
                            data: {
                                action: 'newsmax_ruby_ajax_view_add',
                                post_id: post_id
                            },
                            success: function(data) {
                                ajax_view_el.removeClass('ruby-ajax-view-add');
                            }
                        });
                    })
                }
            }
        }
    };

    $(document).ready(function() {
        newsmax_ruby.document_ready();
        newsmax_ruby.document_load();
        newsmax_ruby.document_reload();
        newsmax_ruby.document_resize();
    });

})(jQuery);