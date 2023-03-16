<?php

/**
 * Plugin Name: VIN Decoder Widget
 * Description: A widget that decodes VIN and fills form fields with the data.
 * Version: 1.0
 * Author: Your Name
 * Author URI: http://yourwebsite.com
 **/

// Load plugin scripts and styles
function vin_decoder_widget_scripts() {
    // Enqueue script for VIN decoding
    wp_enqueue_script( 'carmd-api', plugin_dir_url( __FILE__ ) . 'js/carmd-api.js', array( 'jquery' ) );

    // Enqueue script for widget functionality
    wp_enqueue_script( 'vin-decoder-widget', plugin_dir_url( __FILE__ ) . 'js/vin-decoder-widget.js', array( 'jquery' ) );

    // Enqueue styles
    wp_enqueue_style( 'vin-decoder-widget-style', plugin_dir_url( __FILE__ ) . 'css/vin-decoder-widget.css' );
}
add_action( 'wp_enqueue_scripts', 'vin_decoder_widget_scripts' );

// Register widget
function register_vin_decoder_widget() {
    register_widget( 'Vin_Decoder_Widget' );
}
add_action( 'widgets_init', 'register_vin_decoder_widget' );

// Define widget class
class Vin_Decoder_Widget extends WP_Widget {
    /**
     * Register widget with WordPress.
     */
    public function __construct() {
        parent::__construct(
            'vin_decoder_widget', // Base ID
            'VIN Decoder Widget', // Name
            array( 'description' => 'A widget that decodes VIN and fills form fields with the data.' ) // Args
        );
    }

    /**
     * Front-end display of widget.
     */
    public function widget( $args, $instance ) {
        // Widget output
        echo $args['before_widget'];
        echo $args['before_title'] . apply_filters( 'widget_title', $instance['title'] ) . $args['after_title'];
        echo '<div class="vin-decoder-form">';
        echo '<form>';
        echo '<label for="vin">Enter VIN:</label><br>';
        echo '<input type="text" id="vin" name="vin"><br><br>';
        echo '<label for="year">Year:</label><br>';
        echo '<input type="text" id="year" name="year"><br><br>';
        echo '<label for="make">Make:</label><br>';
        echo '<input type="text" id="make" name="make"><br><br>';
        echo '<label for="model">Model:</label><br>';
        echo '<input type="text" id="model" name="model"><br><br>';
        echo '<label for="submodel">Submodel:</label><br>';
        echo '<input type="text" id="submodel" name="submodel"><br><br>';
        echo '</form>';
        echo '</div>';
        echo $args['after_widget'];
    }

    /**
     * Sanitize widget form values as they are saved.
     */
    public function update( $new_instance, $old_instance ) {
        $instance = array();
        $instance['title'] = sanitize_text_field( $new_instance['title'] );
        return $instance;
    }

    /**
     * Back-end widget form.
     */
    public function form( $instance ) {
        $title = isset( $instance['title'] ) ? esc_attr( $instance['title'] ) : '';
        ?>
        <p>
            <label for="<?php echo $this->get_field_id( 'title' ); ?>"><?php _e( 'Title:' ); ?></label>
           
        </p>
        <?php
    }
}