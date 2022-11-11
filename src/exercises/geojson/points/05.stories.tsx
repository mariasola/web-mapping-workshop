import { useState } from 'react';

import { ViewState } from 'react-map-gl';

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

  const [viewState, setViewState] = useState<Partial<ViewState>>();

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
            'circle-color': '#000000',
            'circle-stroke-color': '#000000',
            'circle-opacity': 0.5,
            'circle-radius': 5,
          },
        },
        {
          type: 'heatmap',
          paint: {
            'heatmap-weight': ['interpolate', ['linear'], ['get', 'scalerank'], 0, 0, 6, 1],
            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 9, 3],
            'heatmap-color': [
              'interpolate',
              ['linear'],
              ['heatmap-density'],
              0,
              'rgba(33,102,172,0)',
              0.2,
              'rgb(103,169,207)',
              0.4,
              'rgb(209,229,240)',
              0.6,
              'rgb(253,219,199)',
              0.8,
              'rgb(239,138,98)',
              1,
              'rgb(178,24,43)',
            ],
            'heatmap-radius': 10,
            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 7, 1, 9, 0],
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="prose">
        <h2>Geojson: Points 05</h2>
        <p>
          With this{' '}
          <a
            href="https://github.com/codeforgermany/click_that_hood/blob/main/public/data/airports.geojson"
            target="_blank"
            rel="noreferrer noopener"
          >
            Geojson
          </a>
          , draw a point collection, center it on the map and display them as a <b>heatmap</b> with
          following styles:
        </p>
        <b>Circle</b>
        <Code>
          {`const color = '#ffCC00';
const border = '#000000';
const opacity = 0.5;
const radius = 2;`}
        </Code>
        <b>Heatmap</b>
        <Code>
          {`const color = '#00CC00';
const border = '#000000';
const intensity = 1;
const opacity = 1;
const radius = 10;
const weight = 1;`}
        </Code>
      </div>
      <Map
        id={id}
        bounds={bounds}
        initialViewState={initialViewState}
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

export const Points05 = Template.bind({});
Points05.args = {
  id: 'airports-map',
  className: '',
  viewport: {},
  initialViewState: {
    bounds: [-154.335938, -63.548552, 154.335938, 63.548552],
    fitBoundsOptions: {
      padding: 50,
    },
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
