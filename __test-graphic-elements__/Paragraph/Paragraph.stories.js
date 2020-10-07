import React from 'react';
import Paragraph from './Paragraph';

import notes from './Paragraph.description.md';

export default { title: 'Paragraph', parameters: { notes } };

export const ParagraphRegular = () => <Paragraph>Paragraph</Paragraph>;