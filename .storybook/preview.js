import { MapProvider } from 'react-map-gl';
import Wrapper from 'components/wrapper';

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
        <Wrapper>
          {Story()}
        </Wrapper>
      </MapProvider>
    );
  },
];
