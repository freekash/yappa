<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'krushqbd_yappa' );

/** MySQL database username */
define( 'DB_USER', 'krushqbd_yappa' );

/** MySQL database password */
define( 'DB_PASSWORD', '91)9@3W3pS' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'n4ti01a28dk8xkq0sf3cbe4e2lnzoufgabttkbb7jlbeg2kpukn09iuqor7qur3z' );
define( 'SECURE_AUTH_KEY',  'zb2rxefmqdu7gar4ulcuresy6rmzqo9qyriepbgzxvq7gfb0t0ibqtxvcrbdoigf' );
define( 'LOGGED_IN_KEY',    'mhaaj7nait6ot45wvykcgutmbyujyg6vvci2p19w3yuiptxqimkxw23pkk3z6kvj' );
define( 'NONCE_KEY',        'vklulnqx3o3zcsgdo9s7hqzgayeo9e1h0psxnjfgdqiljhyygmon9hxxfnauby3s' );
define( 'AUTH_SALT',        'uevjoysepuspuo4jy4b59k6kukavtnwqil4sa9ia7u9zcz1wmxpudzcgpo74v6jr' );
define( 'SECURE_AUTH_SALT', 'zkkk5nzkyhffgr1zm6z895ywyhmcxmoffyhhtko6lzofwe9xkkg1yzarxsts17le' );
define( 'LOGGED_IN_SALT',   'f1slparur5adhjgnehwftduajeewhuoxjhwxqn6ykaw6oyvmogz7smouneiwqyg9' );
define( 'NONCE_SALT',       '8aibc526dbkreuiyvgvwxywwbeqmqv5ktwmeeu5jnrohiha2xsoh1psttspxtals' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpph_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
