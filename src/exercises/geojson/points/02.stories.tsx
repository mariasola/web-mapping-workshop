import { useState } from 'react';

import flatten from 'lodash/flatten';

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

  const colors = [
    '#a3f307',
    '#05f9e2',
    '#e2f705',
    '#f50b86',
    '#ff6f00',
    '#a3f307',
    '#05f9e2',
    '#e2f705',
    '#f50b86',
    '#ff6f00',
  ];

  const rampScalerankAirports = flatten(
    colors.map((c, i) => {
      return [i, c];
    })
  );

  const AIRPORTS_LAYER = {
    id: 'airports',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: AIRPORTS_DATA,
    },
    render: {
      layers: [
        {
          type: 'circle',
          paint: {
            'circle-color': ['match', ['get', 'scalerank'], ...rampScalerankAirports, '#DDD'],
            'circle-opacity': 0.5,
            'circle-radius': 5,
            'circle-stroke-color': [
              'match',
              ['get', 'scalerank'],
              ...rampScalerankAirports,
              '#DDD',
            ],
            'circle-stroke-width': 1,
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

export const AirportScaleranks02 = Template.bind({});
AirportScaleranks02.args = {
  id: 'airports-map',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {
    bbox: [10.9588623046875, 10.5194091796875, 44.01257086123085, 43.6499881760459],
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
