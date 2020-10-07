import React from 'react';
import Microcopy from './Microcopy';

import notes from './Microcopy.description.md';

export default { title: 'Microcopy', parameters: { notes } };

export const MicrocopyRegular = () => <Microcopy>Microcopy</Microcopy>;