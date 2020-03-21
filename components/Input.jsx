import React from 'react';
import PropTypes from 'prop-types';

import InputStyled from './InputStyled';

//const Input = props => <InputStyled onClick={props.onClick}>{props.children}</InputStyled>;

const Input = props => <InputStyled onClick={props.onClick}>{props.children}></InputStyled>;

Input.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Input;
