import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';
const cartoProvider = new CartoProvider();

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

  const [viewState, setViewState] = useState(initialViewState);

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

  const OPTIONS = {
    cartocss: '#wdpa_protected_areas {  polygon-opacity: 1.0; polygon-fill: #704489 }',
    cartocss_version: '2.3.0',
    sql: 'SELECT * FROM wdpa_protected_areas',
  };

  const styles = {
    code: { background: 'black', borderRadius: '4px', color: 'white' },
    properties: {
      margin: '10px',
      background: '#D67CAE',
      borderRadius: '4px',
      color: 'white',
      padding: '10px',
    },
  };

  return (
    <div className="relative w-full h-screen">
      Draw a vector-tiles layer with a protected areas CartoDB tileset, center it on the map and
      display them with next styles.
      <br />
      You should use account <span style={styles.code}>&nbsp;&nbsp;wri-01 &nbsp;</span> and the
      following options:{' '}
      <span style={styles.code}>
        &nbsp;&nbsp;cartocss: {OPTIONS.cartocss}; cartocss_version: {OPTIONS.cartocss_version};sql:{' '}
        {OPTIONS.sql}&nbsp;&nbsp;
      </span>
      <ul style={styles.properties}>
        <li>color: #FFCC00</li>
        <li>opacity: 0.7</li>
        <li>border: #000000</li>
        <li>border opacity: 0.2</li>
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
    </div>
  );
};

export const CartoDB01 = Template.bind({});
CartoDB01.args = {
  id: 'vector-tiles-cartodb',
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
