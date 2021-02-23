import React from 'react';
import { themes } from '@storybook/theming';

import '../src/App.css';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: {
    theme: themes.dark,
  },
}

export const decorators = [(Story) => <div style={{ margin: '3rem' }}><Story/></div>];
