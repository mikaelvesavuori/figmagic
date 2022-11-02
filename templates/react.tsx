import * as React from 'react';

import {{NAME_STYLED}} from './{{NAME_STYLED}}';

interface {{NAME}}Props {
  children: any;
  [propName: string]: any;
}

const {{NAME}}: React.FC<{{NAME}}Props> = (props: any) => (
  <{{NAME_STYLED}}{{EXTRA_PROPS}} {...props}>{props.children ? props.children : "{{TEXT}}"}</{{NAME_STYLED}}>
);

export default {{NAME}};