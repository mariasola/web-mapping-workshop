import { useState, useMemo } from 'react';

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
  const populationValues = useMemo(
    () => data.features.map(({ properties: { population } }) => population),
    []
  );

  const maxValue = Math.max(...populationValues);
  const minValue = Math.min(...populationValues);
  const LAYER = {
    id: 'spain-ccaa',
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
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'population'],
              minValue || 0,
              '#fef0d9',
              maxValue,
              '#004aFF',
            ],
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
        Draw a geojson polygon collection, center the map on it and color it with this
        <ul>
          <li>color: base on an attribute number [...COLOR_RAMP]</li>
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

export const Polygons02 = Template.bind({});
Polygons02.args = {
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
