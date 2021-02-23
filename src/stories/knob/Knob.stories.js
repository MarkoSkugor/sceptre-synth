import React from 'react';

import { Knob } from './Knob';

export default {
  title: 'Knob',
  component: Knob,
};

const Template = (args) => <Knob {...args} />;

export const Volume = Template.bind({});

Volume.args = {
  label: 'Volume',
  units: '',
  initialValue: 1,
  minValue: 0,
  maxValue: 1,
};
