<?php
/**
 * Class newsmax_ruby_fw_block_3
 */
if ( ! class_exists( 'newsmax_ruby_fw_block_3' ) ) {
	class newsmax_ruby_fw_block_3 extends newsmax_ruby_block {

		/**-------------------------------------------------------------------------------------------------------------------------
		 * @param $block
		 *
		 * @return string
		 * render block layout
		 */
		static function render( $block ) {

			//add block data
			$block['block_type']                     = 'full_width';
			$block['block_classes']                  = 'fw-block block-feat fw-block-3';
			$block['block_options']['no_found_rows'] = true;
			if ( ! empty( $block['block_options']['grid_style'] ) ) {
				$block['block_classes'] = 'fw-block block-feat fw-block-3 is-grid-style-' . esc_attr( $block['block_options']['grid_style'] );
			}

			//check number of slider
			if ( empty( $block['block_options']['slides_per_page'] ) ) {
				$block['block_options']['slides_per_page'] = 1;
			}

			$block['block_options']['posts_per_page'] = $block['block_options']['slides_per_page'] * 4;

			//query data
			$data_query = parent::get_data( $block );

			//render
			$str = '';
			$str .= parent::block_open( $block, $data_query );
			$str .= parent::block_header( $block );
			$str .= self::content( $block, $data_query );
			$str .= parent::block_close();

			return $str;
		}

		/**-------------------------------------------------------------------------------------------------------------------------
		 * @param $block
		 *
		 * @return string
		 * render block block content
		 */
		static function content( $block, $data_query ) {

			//check
			if ( empty( $block['block_options'] ) ) {
				return false;
			}

			//render
			$str = '';
			$str .= parent::block_content_open( 'row' );

			//check empty
			if ( $data_query->have_posts() ) {
				$str .= self::listing( $data_query, $block['block_options'] );
			} else {
				$str .= parent::no_content();
			}

			$str .= parent::block_content_close();

			//reset post data
			wp_reset_postdata();

			return $str;
		}


		/**-------------------------------------------------------------------------------------------------------------------------
		 * @param $data_query
		 * @param array $options
		 *
		 * @return string
		 * render listing
		 */
		static function listing( $data_query, $options = array() ) {

			$str           = '';
			$counter       = 1;
			$counter_style = 1;
			$total         = $data_query->post_count;
			$loop          = intval( floor( $total / 4 ) );

			if ( 1 > $loop ) {
				return parent::not_enough_post( 4 );
			}

			//check slider
			if ( 1 < $loop ) {
				$str .= '<div class="fw-block-3-slider-outer">';
				$str .= '<div class="slider-loader"></div>';
				$str .= '<div class="fw-block-3-slider slider-init">';
			}

			for ( $i = 1; $i <= $loop; $i ++ ) {
				$str .= '<div class="fw-block-3-slider-el">';
				while ( $data_query->have_posts() ) {
					$data_query->the_post();

					if ( 1 == $counter ) {
						$str .= '<div class="col-left col-md-8 col-sm-12">';
						$str .= '<div class="post-outer-nth-' . esc_attr( $counter_style ) . '">';
						$str .= newsmax_ruby_post_feat_3( $options );
						$str .= '</div>';
						$str .= '</div><!--#left column-->';
					} else {
						if ( 2 == $counter ) {
							$str .= '<div class="col-right col-md-4 col-sm-12">';
							$str .= '<div class="post-outer-nth-' . esc_attr( $counter_style ) . ' col-md-12 col-sm-4 col-xs-12">';
							$str .= newsmax_ruby_post_feat_5( $options );
							$str .= '</div>';
						} elseif ( 3 == $counter ) {
							$str .= '<div class="post-outer-nth-' . esc_attr( $counter_style ) . ' col-md-12 col-sm-4 col-xs-12">';
							$str .= newsmax_ruby_post_feat_5( $options );
							$str .= '</div>';
						} elseif ( 4 == $counter ) {
							$str .= '<div class="post-outer-nth-' . esc_attr( $counter_style ) . ' col-md-12 col-sm-4 col-xs-12">';
							$str .= newsmax_ruby_post_feat_5( $options );
							$str .= '</div>';
							$str .= '</div><!--#right column-->';
						}
					}

					//reset counter style
					$counter_style ++;
					if ( 7 < $counter_style ) {
						$counter_style = 1;
					}

					//reset counter
					if ( $counter >= 4 ) {
						$counter = 1;
						break;
					} else {
						$counter ++;
					}
				}
				$str .= '</div>';
			}

			if ( 1 < $loop ) {
				$str .= '</div><!--#slider-->';
				$str .= '</div><!--#slider outer-->';
			}

			return $str;
		}


		/**-------------------------------------------------------------------------------------------------------------------------
		 * @return array
		 * init block options
		 */
		static function block_config() {
			return array(
				'filter' => array(
					'category_id'     => true,
					'category_ids'    => true,
					'tags'            => true,
					'post_format'     => true,
					'authors'         => true,
					'orderby'         => true,
					'slides_per_page' => 1,
					'offset'          => true
				),
				'header' => array(
					'title'        => '',
					'title_url'    => true,
					'header_color' => true,
				),
				'design' => array(
					'position'         => true,
					'grid_style'       => true,
					'background'       => true,
					'background_image' => true,
					'cat_info'         => true,
					'meta_info'        => true,
					'share'            => true
				)
			);
		}
	}
}
