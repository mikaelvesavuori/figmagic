import styled from 'styled-components';

import {{NAME_CSS}} from './{{NAME_CSS}}';

interface {{NAME}}Props {
  children: any;
  [propName: string]: {};
}

// Extend the below as needed
const {{NAME_STYLED}} = styled.{{ELEMENT}}<{{NAME}}Props>`
  ${{{NAME_CSS}}};
`;

export default {{NAME_STYLED}};