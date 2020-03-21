import React from 'react';
import PropTypes from 'prop-types';

import ButtonWarning from './ButtonWarning';

const ButtonWarning = props => <ButtonWarning onClick={props.onClick}>{props.children}</ButtonWarning>;

ButtonWarning.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ButtonWarning;
