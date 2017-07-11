import React, { Component } from 'react';
import injectSheet from '../styles/injectSheet'

class Example2 extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.red}>
                This is the example 2 page, with jss styles
            </div>
        );
    }
}

export default injectSheet({
    red: {
        color: "red"
    }
})(Example2);
