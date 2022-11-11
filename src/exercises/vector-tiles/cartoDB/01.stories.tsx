import { useState } from 'react';

import { ViewState } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

const cartoProvider = new CartoProvider();

import Code from 'components/code';
import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';

const StoryMap = {
  title: 'Exercises/Vector Tiles/Carto DB',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const [viewState, setViewState] = useState<Partial<ViewState>>();

  const CARTODB_LAYER = {
    id: 'vector-tiles-cartodb',
    type: 'vector',
    source: {
      type: 'vector',
      provider: {
        type: 'carto',
        account: 'wri-01',
        layers: [
          {
            options: {
              cartocss: '#wdpa_protected_areas {  polygon-opacity: 1.0; polygon-fill: #704489 }',
              cartocss_version: '2.3.0',
              sql: 'SELECT * FROM wdpa_protected_areas',
            },
            type: 'cartodb',
          },
        ],
      },
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'layer0',
          paint: {
            'fill-color': '#FFCC00',
            'fill-opacity': 0.7,
          },
        },
        {
          type: 'line',
          'source-layer': 'layer0',
          paint: {
            'line-color': '#000000',
            'line-opacity': 0.2,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="prose">
        <h2>Vector tiles: CartoDB 01</h2>
        <p>
          Draw a vector tiles layer with a protected areas CartoDB tileset, center it on the map and
          display it with next styles:
          <Code>
            {`border = '#000000';
borderOpacity = 0.2;
color = '#FFCC00';
opacity = 0.7;`}
          </Code>
          You should use account: <pre>wri-01</pre> and the following options:
          <Code>
            {`cartocss: '#wdpa_protected_areas {  polygon-opacity: 1.0; polygon-fill: #704489 }',
cartocss_version: '2.3.0',
sql: 'SELECT * FROM wdpa_protected_areas',`}
          </Code>
        </p>
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
              <LayerManager
                map={map}
                plugin={PluginMapboxGl}
                providers={{
                  [cartoProvider.name]: cartoProvider.handleData,
                }}
              >
                <Layer key={CARTODB_LAYER.id} {...CARTODB_LAYER} />
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

export const CartoDB01 = Template.bind({});
CartoDB01.args = {
  id: 'vector-tiles-cartodb',
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
