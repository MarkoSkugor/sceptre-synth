import React from 'react';

import Switch from './Switch';

export default {
  title: 'Switch',
  component: Switch,
};

const Template = (args) => <Switch {...args} />;

export const OnOff = Template.bind({});

OnOff.args = {
  label: 'On/Off',
  initialValue: false,
};
