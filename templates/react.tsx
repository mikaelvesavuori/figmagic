import * as React from 'react';

import {{NAME_STYLED}} from './{{NAME_STYLED}}';

interface {{NAME}}Props {
  children: any;
  [propName: string]: {};
}

const {{NAME}}: React.FC<{{NAME}}Props> = ({ children }) => (
  <{{NAME_STYLED}}{{EXTRA_PROPS}} {...props}>{children ? children : "{{TEXT}}"}</{{NAME_STYLED}}>
);

export default {{NAME}};