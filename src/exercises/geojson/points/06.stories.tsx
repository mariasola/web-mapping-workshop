import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';
import AIRPORTS_DATA from 'data/points.json';

const StoryMap = {
  title: 'Exercises/Geojson/Points',
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const [viewState, setViewState] = useState(initialViewState);
  const AIRPORTS_LAYER = {
    id: 'airports',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: AIRPORTS_DATA,
    },
    images: [
      {
        id: 'airport',
        src: '/images/airplane.svg',
        options: {},
      },
    ],
    render: {
      layers: [
        {
          type: 'symbol',
          layout: {
            'icon-image': 'airport',
            'icon-ignore-placement': true,
            'icon-allow-overlap': true,
            'icon-rotate': 315,
            'icon-size': ['interpolate', ['linear'], ['zoom'], 0.18, 0.15, 0.2, 0.1],
          },
        },
        {
          type: 'circle',
          paint: {
            'circle-color': '#0000FF',
            'circle-opacity': 0.3,
            'circle-radius': 10,
          },
        },
      ],
    },
  };

  return (
    <div className="relative w-full h-screen">
      <Map
        id={id}
        bounds={bounds}
        viewState={viewState}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={(v) => {
          setViewState(v);
        }}
      >
        {(map) => {
          return (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                <Layer key={AIRPORTS_LAYER.id} {...AIRPORTS_LAYER} />
              </LayerManager>
              <Controls>
                <ZoomControl id={id} />
              </Controls>
            </>
          );
        }}
      </Map>
    </div>
  );
};

export const AirportImages = Template.bind({});
AirportImages.args = {
  id: 'airports-map',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {
    bbox: [-154.335938, -63.548552, 154.335938, 63.548552],
    options: { padding: 50 },
    viewportOptions: { transitionDuration: 0 },
  },
  onMapViewportChange: (viewport) => {
    console.info('onMapViewportChange: ', viewport);
  },
  onMapReady: ({ map, mapContainer }) => {
    console.info('onMapReady: ', map, mapContainer);
  },
  onMapLoad: ({ map, mapContainer }) => {
    console.info('onMapLoad: ', map, mapContainer);
  },
};
