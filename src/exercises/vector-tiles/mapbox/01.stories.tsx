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
  title: 'Exercises/Vector Tiles/Mapbox',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const [viewState, setViewState] = useState(initialViewState);

  const MAPBOX_LAYER = {
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
            'circle-radius': 20,
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
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12,
          },
        },
      ],
    },
  };

  return (
    <div className="relative w-full h-screen">
      Draw a tiles layer with a Mapbox tileset, center it on the map and display them as
      <ul>
        {/* <li>Circles</li>
        <li>color: #ffCC00</li>
        <li>border: #000000</li>
        <li>radius: 20</li>
        <li>opacity: 0.5</li> */}
      </ul>
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
                <Layer key={MAPBOX_LAYER.id} {...MAPBOX_LAYER} />
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

export const Mapbox01 = Template.bind({});
Mapbox01.args = {
  id: 'tiles-map',
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
