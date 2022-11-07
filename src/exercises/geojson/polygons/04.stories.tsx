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
  title: 'Exercises/Geojson/Polygons',
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;
  const [viewState, setViewState] = useState(initialViewState);

  const LAYER = {
    id: 'spain-ccaa-hover',
    type: 'vector',
    source: {
      data,
      type: 'geojson',
      promoteId: 'cartodb_id',
    },
    render: {
      layers: [
        {
          type: 'fill',
          paint: {
            'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 1, 0.6],
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              '#000000',
              [
                'match',
                ['get', 'cod_ccaa'],
                '1',
                '#0080FF',
                '2',
                '#45B922',
                '3',
                '#2E97D0',
                '4',
                '#E7F317',
                '5',
                '#5CAEA2',
                '6',
                '#FFF300',
                '7',
                '#5CA2A2',
                '8',
                '#FFDC00',
                '9',
                '#FFD000',
                '10',
                '#FF0000',
                '11',
                '#8B7345',
                '12',
                '#FFAE00',
                '13',
                '#2ED0D0',
                '14',
                '#FF9700',
                '15',
                '#738B3A',
                '16',
                '#FF7000',
                '17',
                '#FF5000',
                '18',
                '#FF0080',
                '#ccc',
              ],
            ],
          },
        },
        {
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
        Draw a geojson polygon collection, center the map on it and color it with this and apply a
        hover effect
        <ul>
          <li>Polygon</li>
          <li>color: base on an attribute category [...COLOR_RAMP]</li>
          <li>border: #000000</li>
          <li>opacity: 0.5</li>

          <li>Hover</li>
          <li>color: #000000</li>
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

export const Polygons03 = Template.bind({});
Polygons03.args = {
  id: 'valencia-provinces',
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
  onHover: ({ map, mapContainer }) => {
    console.info('onHover: ', map, mapContainer);
  },
};
