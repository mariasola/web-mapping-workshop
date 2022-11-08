import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';

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
    id: 'vector-tiles-mapbox',
    type: 'vector',
    source: {
      url: 'mapbox://layer-manager.1ecpue1k',
    },
    render: {
      layers: [
        // {
        //   type: 'fill',

        //   'source-layer': 'Indicators',
        //   paint: {
        //     'fill-color': 'red',
        //     'fill-opacity': 0.5,
        //   },
        // },
        {
          type: 'fill',
          filter: ['all', ['==', 'bws_cat', 0], ['==', 'pop_cat', 0]],
          'source-layer': 'Indicators',
          paint: {
            'fill-color': '#77CCFF',
            'fill-opacity': 0.5,
          },
        },
        {
          type: 'fill',
          filter: ['all', ['!=', 'bws_cat', 0], ['!=', 'pop_cat', 0]],
          'source-layer': 'Indicators',
          paint: {
            'fill-color': '#ff0000',
            'fill-opacity': 0.5,
          },
        },
        {
          type: 'line',
          filter: ['all', ['!=', 'bws_cat', 0], ['!=', 'pop_cat', 0]],
          'source-layer': 'Indicators',
          paint: {
            'fill-color': '#ff0000',
            'line-width': 1,
          },
        },
        {
          type: 'line',
          filter: ['all', ['==', 'bws_cat', 0], ['==', 'pop_cat', 0]],
          'source-layer': 'Indicators',
          paint: {
            'line-color': '#0044FF',
            'line-width': 1,
          },
        },
      ],
    },
  };

  const styles = {
    code: { background: 'black', borderRadius: '4px', color: 'white' },
  };

  return (
    <div className="relative w-full h-screen">
      <div className="prose dark:prose-invert">
        Draw a vector-tiles layer with a Mapbox tileset, tileset ID{' '}
        <span style={styles.code}>&nbsp;&nbsp;layer-manager.1ecpue1k&nbsp;&nbsp;</span>, and
        highlight in dark blue those counties with{' '}
        <span style={styles.code}>&nbsp;bws_cat = 0&nbsp;</span> and{' '}
        <span style={styles.code}>&nbsp;pop_cat = 0&nbsp;</span>
        and with red those which dont meet the requirement.
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

export const Mapbox06 = Template.bind({});
Mapbox06.args = {
  id: 'vector-tiles-mapbox',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {
    bbox: [-170.875677, 26.606678, -62.418646, 67.415284],
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
