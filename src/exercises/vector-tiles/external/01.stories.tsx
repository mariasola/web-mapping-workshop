import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';

const StoryMap = {
  title: 'Exercises/Vector Tiles/External',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const [viewState, setViewState] = useState(initialViewState);

  const EXTERNAL_LAYER = {
    id: 'vector-tiles-external',
    type: 'vector',
    source: {
      type: 'vector',
      tiles: [
        'https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/tile/{z}/{y}/{x}.pbf',
      ],
    },
    render: {
      layers: [
        {
          interactive: true,
          type: 'fill',
          'source-layer': 'Santa_Monica_Mountains_Parcels',
          paint: {
            'fill-color': '#77CCFF',
          },
        },
        {
          interactive: true,
          type: 'line',
          'source-layer': 'Santa_Monica_Mountains_Parcels',
          paint: {
            'line-color': '#0044FF',
            'line-width': 1,
          },
        },
      ],
    },
  };

  return (
    <div className="relative w-full h-screen">
      Draw a tiles layer, center it on the map and display them as
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
                <Layer key={EXTERNAL_LAYER.id} {...EXTERNAL_LAYER} />
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

export const External01 = Template.bind({});
External01.args = {
  id: 'vector-tiles-external',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {
    bbox: [-118.790682, 33.950831, -118.367022, 34.160179],
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
