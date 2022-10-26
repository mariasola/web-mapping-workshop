import { themes } from '@storybook/theming';
import { MapProvider } from 'react-map-gl';

import '../src/styles/globals.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: [
        'Concepts',
        'Examples',
        'Components',
      ],
    },
  },
  docs: {
    theme: themes.dark,
  },
};

export const decorators = [
  (Story) => {
    return (
      <MapProvider>
        <div className='text-white'>{Story()}</div>
      </MapProvider>
    );
  },
];
