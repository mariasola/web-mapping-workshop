import { useState } from 'react';

import { ViewState } from 'react-map-gl';

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

  const [viewState, setViewState] = useState<Partial<ViewState>>();

  const MAPBOX_LAYER = {
    id: 'vector-tiles-mapbox',
    type: 'vector',
    source: {
      url: 'mapbox://layer-manager.1ecpue1k',
    },
    render: {
      layers: [
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
            'fill-color': '#FF0000',
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

  return (
    <>
      <div className="prose">
        <h2>Vector tiles: Mapbox 07</h2>
        <p>
          Draw a vector-tiles layer with a Mapbox tileset, highlight in dark blue those counties
          whose <b>bws_cat = 0 </b> and <b>pop_cat = 0</b> and highlight in red those which dont
          meet the requirement.
        </p>
        <p>You should use this tileset ID:</p>
        <pre>layer-manager.1ecpue1k</pre>
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
                <Layer key={MAPBOX_LAYER.id} {...MAPBOX_LAYER} />
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

export const Mapbox07 = Template.bind({});
Mapbox07.args = {
  id: 'vector-tiles-mapbox',
  className: '',
  viewport: {},
  initialViewState: {
    bounds: [-170.875677, 26.606678, -62.418646, 68.515284],
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
