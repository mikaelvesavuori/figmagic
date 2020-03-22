import React from 'react';
import PropTypes from 'prop-types';

import {{NAME_STYLED}} from './{{NAME_STYLED}}';

// Example:
//const {{NAME}} = props => <{{NAME_STYLED}} onClick={props.onClick}>{props.children}</{{NAME_STYLED}}>;

const {{NAME}} = props => <{{NAME_STYLED}} {{EXTRA_PROPS}}>{props.children}</{{NAME_STYLED}}>; //{{MARKUP}};

{{NAME}}.propTypes = {
  //onClick: PropTypes.func.isRequired
};

export default {{NAME}};
