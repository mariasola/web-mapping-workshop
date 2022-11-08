import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';
import data from 'data/valencia.json';

const StoryMap = {
  title: 'Exercises/Geojson/Lines',
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;
  const [viewState, setViewState] = useState(initialViewState);

  const stops = [0, '#FE4365', 0.2, '#FC9D9A', 0.6, '#F9CDAD', 0.9, '#C8C8A9', 1, '#83AF9B'];

  const LAYER = {
    id: 'valencia-routes-gradient',
    type: 'vector',
    source: {
      data,
      type: 'geojson',
      lineMetrics: true,
    },
    render: {
      layers: [
        {
          type: 'line',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-width': 5,
            'line-opacity': 0.5,
            'line-gradient': ['interpolate', ['linear'], ['line-progress'], ...stops],
          },
        },
        {
          type: 'line',
          paint: {
            'line-color': ['interpolate', ['linear'], ['get', 'maxspeed'], 0, 'red', 30, 'blue'],
            'line-width': 1,
          },
          layout: {
            'line-cap': 'square',
          },
        },
      ],
    },
  };
  return (
    <div className="relative w-full h-screen">
      <div className="prose dark:prose-invert">
        Draw a geojson linestring collection, center the map on it and color it with this
        <ul>
          <li>color: base on an attribute category [...COLOR_RAMP]</li>
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

export const Lines03 = Template.bind({});
Lines03.args = {
  id: 'valencia-provinces',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {
    bbox: [-0.477576, 39.389689, -0.257849, 39.542355],
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
