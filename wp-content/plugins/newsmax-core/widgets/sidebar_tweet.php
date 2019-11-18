<?php
/**
 * widget twitter tweet
 */
if ( ! function_exists( 'newsmax_ruby_register_sb_widget_tweet' ) ) {
	function newsmax_ruby_register_sb_widget_tweet() {
		register_widget( 'newsmax_ruby_sb_widget_tweet' );
	}
	add_action( 'widgets_init', 'newsmax_ruby_register_sb_widget_tweet' );
}

if ( ! class_exists( 'newsmax_ruby_sb_widget_tweet' ) ) {
	class newsmax_ruby_sb_widget_tweet extends WP_Widget {

		function __construct() {
			$widget_ops = array(
				'classname'   => 'sb-widget-tweet',
				'description' => esc_html__( '[Sidebar Widget] Display latest tweets in sidebar. This widget need to install oAuth Twitter Feed for Developers plugin', 'newsmax-core' )
			);
			parent::__construct( 'newsmax_ruby_sb_widget_tweet', esc_html__( '[SIDEBAR] - Twitter tweets', 'newsmax-core' ), $widget_ops );
		}

		//render widget
		function widget( $args, $instance ) {

			extract($args, EXTR_SKIP);

			$title                   = apply_filters( 'widget_title', ! empty( $instance['title'] ) ? $instance['title'] : '', $instance );
			$options['twitter_user'] = ( ! empty( $instance['twitter_user'] ) ) ? $instance['twitter_user'] : '';
			$options['num_tweets']   = ( ! empty( $instance['num_tweets'] ) ) ? $instance['num_tweets'] : 5;

			echo $before_widget;

			if ( ! empty( $title ) ) {
				echo $before_title . esc_attr( $title ) . $after_title;
			}
			?>
			<ul class="twitter-widget-inner">
				<?php if ( function_exists( 'getTweets' ) ) :

					$tweets_data = getTweets( $options['num_tweets'], $options['twitter_user'] );
					if ( ! empty( $tweets_data ) && is_array( $tweets_data ) && empty( $tweets_data['error'] ) ) :
						foreach ( $tweets_data as $tweet ) :
							$tweet['text'] = preg_replace( '/\b([a-zA-Z]+:\/\/[\w_.\-]+\.[a-zA-Z]{2,6}[\/\w\-~.?=&%#+$*!]*)\b/i', "<a href=\"$1\" class=\"twitter-link\">$1</a>", $tweet['text'] );
							$tweet['text'] = preg_replace( '/\b(?<!:\/\/)(www\.[\w_.\-]+\.[a-zA-Z]{2,6}[\/\w\-~.?=&%#+$*!]*)\b/i', "<a href=\"http://$1\" class=\"twitter-link\">$1</a>", $tweet['text'] );
							$tweet['text'] = preg_replace( "/\b([a-zA-Z][a-zA-Z0-9\_\.\-]*[a-zA-Z]*\@[a-zA-Z][a-zA-Z0-9\_\.\-]*[a-zA-Z]{2,6})\b/i", "<a href=\"mailto://$1\" class=\"twitter-link\">$1</a>", $tweet['text'] );
							$tweet['text'] = preg_replace( '/([\.|\,|\:|\>|\{|\(]?)#{1}(\w*)([\.|\,|\:|\!|\?|\>|\}|\)]?)\s/i', "$1<a href=\"http://twitter.com/#search?q=$2\" class=\"twitter-link\">#$2</a>$3 ", $tweet['text'] );
							$tweet['text'] = str_replace( 'RT', ' ', $tweet['text'] );

							$time = strtotime( $tweet['created_at'] );
							if ( ( abs( time() - $time ) ) < 86400 ) {
								$h_time = sprintf( esc_html__( '%s ago', 'newsmax-core' ), human_time_diff( $time ) );
							} else {
								$h_time = date( 'M j, Y', $time );
							}
							?>

							<li class="twitter-content post-excerpt">
								<p><?php echo do_shortcode( $tweet['text'] ); ?></p>
								<em class="twitter-timestamp"><?php echo esc_attr( $h_time ) ?></em>
							</li>

						<?php endforeach; ?>
					<?php
					else :
						echo '<li class="ruby-error">' . $tweets_data['error'] . '</li>';
					endif; ?>
				<?php else : echo '<li class="ruby-error">' . esc_html__( 'Please install plugin name "oAuth Twitter Feed for Developers', 'newsmax-core' ) . '</li>'; ?>
				<?php endif; ?>

			</ul>

			<?php
			echo $after_widget;
		}

		//update form
		function update( $new_instance, $old_instance ) {
			$instance = $old_instance;
			delete_transient( 'newsmax_ruby_tweet_feed' );
			$instance['title']        = strip_tags( $new_instance['title'] );
			$instance['twitter_user'] = strip_tags( $new_instance['twitter_user'] );
			$instance['num_tweets']   = absint( strip_tags( $new_instance['num_tweets'] ) );
			return $instance;
		}


		//from settings
		function form( $instance ) {
			$defaults = array(
				'title'        => esc_html__( 'Latest Tweets', 'newsmax-core' ),
				'twitter_user' => '',
				'num_tweets'   => 4
			);
			$instance = wp_parse_args( (array) $instance, $defaults );	?>

			<p>
				<label for="<?php echo esc_attr($this->get_field_id( 'title' )); ?>"><strong><?php esc_attr_e('Title:', 'newsmax-core');?></strong></label>
				<input type="text" class="widefat"  id="<?php echo esc_attr($this->get_field_id( 'title' )); ?>" name="<?php echo esc_attr($this->get_field_name( 'title' )); ?>" value="<?php echo esc_attr($instance['title']); ?>"/>
			</p>
			<p>
				<label for="<?php echo esc_attr($this->get_field_id( 'twitter_user' )); ?>"><strong><?php esc_attr_e('Twitter Name:', 'newsmax-core');?></strong></label>
				<input type="text" class="widefat"  id="<?php echo esc_attr($this->get_field_id( 'twitter_user' )); ?>" name="<?php echo esc_attr($this->get_field_name( 'twitter_user' )); ?>" value="<?php echo esc_attr($instance['twitter_user']); ?>"/>
			</p>
			<p>
				<label for="<?php echo esc_attr($this->get_field_id( 'num_tweets' )); ?>"><strong><?php esc_attr_e('Number of Tweets:', 'newsmax-core');?></strong></label>
				<input type="text" class="widefat"  id="<?php echo esc_attr($this->get_field_id( 'num_tweets' )); ?>" name="<?php echo esc_attr($this->get_field_name( 'num_tweets' )); ?>" value="<?php echo esc_attr($instance['num_tweets']); ?>"/>
			</p>
			<p><a href="http://dev.twitter.com/apps" target="_blank"><?php esc_attr_e('Please create your Twitter App ', 'newsmax-core'); ?></a><?php esc_html_e(' and install ','newsmax-core'); ?><a href="https://wordpress.org/plugins/oauth-twitter-feed-for-developers/"><?php esc_html_e('"oAuth Twitter Feed for Developers" Plugin','newsmax-core');?></a></p>
		<?php
		}
	}
}


