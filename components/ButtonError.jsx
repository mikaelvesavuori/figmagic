import React from 'react';
import PropTypes from 'prop-types';

import ButtonError from './ButtonError';

const ButtonError = props => <ButtonError onClick={props.onClick}>{props.children}</ButtonError>;

ButtonError.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonError;
