import * as React from 'react';

import ParagraphStyled from './ParagraphStyled';

const Paragraph = (props) => <ParagraphStyled>Paragraph{props.children}</ParagraphStyled>;

export default Paragraph;