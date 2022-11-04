import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';
import data from 'data/provinces.json';

const StoryMap = {
  title: 'Exercises/Geojson/Polygons',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const [viewState, setViewState] = useState(initialViewState);
  const LAYER = {
    id: 'spain-provinces',
    type: 'vector',
    source: {
      data,
      type: 'geojson',
    },
    render: {
      layers: [
        {
          id: 'province-area',
          type: 'fill',
          paint: {
            'fill-color': '#ffCC00',
            'fill-opacity': 0.5,
          },
        },
        {
          id: 'province-boundary',
          type: 'line',
          paint: {
            'line-color': '#000000',
            'line-opacity': 1,
          },
        },
      ],
    },
  };
  return (
    <div className="relative w-full h-screen">
      <div className="prose dark:prose-invert">
        Draw a geojson polygon, center the map on it and color it with this
        <ul>
          <li>color: #ffCC00</li>
          <li>border: #000000</li>
          <li>opacity: 0.5</li>
        </ul>
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
                <Layer key={LAYER.id} {...LAYER} />
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

export const Polygons01 = Template.bind({});
Polygons01.args = {
  id: 'spain-provinces',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {
    bbox: [-13.392736, 35.469583, 7.701014, 43.460862],
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
