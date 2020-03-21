import React from 'react';
import PropTypes from 'prop-types';

import Form from './Form';

const Form = props => <Form onClick={props.onClick}>{props.children}</Form>;

Form.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Form;
