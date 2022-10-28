import { useMemo, useState } from 'react';

import uniq from 'lodash/uniq';

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
    '#e65154',
    '#26b6ff',
    '#67e6d1',
    '#cd76d6',
    '#ffca8c',
    '#fff2b3',
    '#ff8cd9',
    '#c8f2a9',
    '#d4b8ff',
  ];

  const aiportTypes = useMemo(() => uniq(AIRPORTS_DATA.features.map((f) => f.properties.type)), []);

  const typeAirportsRamp = useMemo(
    () =>
      aiportTypes
        .map((a, i) => {
          return {
            [a]: colors[i],
          };
        })
        .map((item) => Object.entries(item))
        .flat(2),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [aiportTypes]
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
            'circle-color': ['match', ['get', 'type'], ...typeAirportsRamp, '#DDD'],
            'circle-opacity': 0.5,
            'circle-radius': 5,
            'circle-stroke-color': ['match', ['get', 'type'], ...typeAirportsRamp, '#DDD'],
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

export const AirportTypes03 = Template.bind({});
AirportTypes03.args = {
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
