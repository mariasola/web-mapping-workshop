import { useMemo, useState } from 'react';

import uniq from 'lodash/uniq';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Code from 'components/code';
import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';
import AIRPORTS_DATA from 'data/airports.json';

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
    () => aiportTypes.map((a, i) => Object.entries({ [a]: colors[i] })).flat(2),
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
    <>
      <div className="prose">
        <h2>Geojson: Points 03</h2>
        <p>
          With this{' '}
          <a
            href="https://github.com/codeforgermany/click_that_hood/blob/main/public/data/airports.geojson"
            target="_blank"
            rel="noreferrer noopener"
          >
            Geojson
          </a>
          , draw a point collection, fill it with a <b>color ramp</b> base on an{' '}
          <b>string attribute</b>, center the map on it and display them with following styles:
        </p>
        <Code>
          {`const border = '#000000';
const opacity = 0.5;`}
        </Code>
      </div>
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
    </>
  );
};

export const Points03 = Template.bind({});
Points03.args = {
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
