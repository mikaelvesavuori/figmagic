import React from 'react';

import Button from '../src/components/Button';

export default {
  title: 'Button',
  component: Button
};

export const Text = () => <Button>Hello Button</Button>;

Text.story = {
  name: 'with emoji'
};
