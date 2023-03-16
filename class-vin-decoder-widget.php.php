/**
 * Back-end widget form.
 *
 * @see WP_Widget::form()
 *
 * @param array $instance Previously saved values from database.
 */
public function form( $instance ) {
    $partner_token = ! empty( $instance['partner_token'] ) ? $instance['partner_token'] : '';
    $authorization_key = ! empty( $instance['authorization_key'] ) ? $instance['authorization_key'] : '';
    ?>
    <p>
        <label for="<?php echo $this->get_field_id( 'partner_token' ); ?>"><?php _e( 'Partner Token:' ); ?></label>
        <input class="widefat" id="<?php echo $this->get_field_id( 'partner_token' ); ?>" name="<?php echo $this->get_field_name( 'partner_token' ); ?>" type="text" value="<?php echo esc_attr( $partner_token ); ?>" />
    </p>
    <p>
        <label for="<?php echo $this->get_field_id( 'authorization_key' ); ?>"><?php _e( 'Authorization Key:' ); ?></label>
        <input class="widefat" id="<?php echo $this->get_field_id( 'authorization_key' ); ?>" name="<?php echo $this->get_field_name( 'authorization_key' ); ?>" type="text" value="<?php echo esc_attr( $authorization_key ); ?>" />
    </p>
    <?php
}
