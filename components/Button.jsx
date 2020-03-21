import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';

const Button = props => <Button onClick={props.onClick}>{props.children}</Button>;

Button.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Button;
