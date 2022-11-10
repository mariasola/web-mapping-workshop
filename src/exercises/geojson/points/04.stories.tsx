import { useState } from 'react';

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
  const AIRPORTS_LAYER = {
    id: 'airports',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: AIRPORTS_DATA,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    },
    render: {
      layers: [
        {
          type: 'circle',
          id: 'clusters',
          filter: ['has', 'point_count'],
          paint: {
            'circle-stroke-color': '#000000',
            'circle-opacity': 0.5,
            'circle-radius': ['step', ['get', 'point_count'], 16, 25, 18, 50, 20],
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              25,
              '#f1f075',
              50,
              '#f28cb1',
            ],
          },
        },
        {
          id: 'cluster-count',
          type: 'symbol',
          filter: ['has', 'point_count'],
          layout: {
            'text-allow-overlap': true,
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': ['step', ['get', 'point_count'], 10, 25, 11, 50, 12],
          },
        },
      ],
    },
  };
  return (
    <>
      <div className="prose">
        <h2>Geojson: Points 04</h2>
        <p>
          With this{' '}
          <a
            href="https://github.com/codeforgermany/click_that_hood/blob/main/public/data/airports.geojson"
            target="_blank"
            rel="noreferrer noopener"
          >
            Geojson
          </a>
          , draw a point collection, center it on the map and display them as <b>circle clusters</b>{' '}
          with a <b>count inside</b> and the following styles:
        </p>
        <b>Circle</b>
        <Code>
          {`const color = '#ffCC00';
const border = '#000000';
const opacity = 0.5;
const radius = 20;`}
        </Code>
        <b>Cluster</b>
        <Code>
          {`const color = '#00CC00';
const border = '#000000';
const opacity = 1;
const radius = 50;`}
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

export const Points04 = Template.bind({});
Points04.args = {
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
