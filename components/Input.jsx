import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';

const Input = props => <Input onClick={props.onClick}>{props.children}</Input>;

Input.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Input;
