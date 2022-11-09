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
};

export const decorators = [
  (Story) => {
    return (
      <MapProvider>
        {Story()}
      </MapProvider>
    );
  },
];
