import React from 'react';
import PropTypes from 'prop-types';

import {{NAME_STYLED}} from './{{NAME_STYLED}}';

const {{NAME}} = (props) => <{{NAME_STYLED}}{{EXTRA_PROPS}} {...props}>{props.children ? props.children : "{{TEXT}}"}</{{NAME_STYLED}}>;

{{NAME}}.propTypes = {};

export default {{NAME}};