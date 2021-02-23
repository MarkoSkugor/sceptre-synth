import React from 'react';

import Keyboard from './Keyboard';

export default {
  title: 'Keyboard',
  component: Keyboard,
};

const Template = (args) => <Keyboard {...args} />;

export const Default = Template.bind({});

Default.args = {
  numOctaves: 1,
  startingOctave: 1,
};
