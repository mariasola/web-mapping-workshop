import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';

const StoryMap = {
  title: 'Exercises/Raster',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const [viewState, setViewState] = useState(initialViewState);

  const RASTER_LAYER = {
    id: 'gain',
    name: 'Tree cover gain',
    type: 'raster',
    source: {
      type: 'raster',
      tileSize: 256,
      tiles: ['https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png'],
      minzoom: 3,
      maxzoom: 12,
    },
    render: {
      layers: [
        {
          type: 'raster',
          paint: {
            'raster-saturation': 1,
          },
        },
      ],
    },
  };

  return (
    <div className="relative flex flex-col w-full h-[calc(100vh_-_32px)]">
      <div className="prose max-w-none">
        <h2>Raster tiles</h2>
        <ul>
          <li>
            Draw a raster layer with this url source{' '}
            <em>{`https://earthengine.google.org/static/hansen_2013/gain_alpha/{z}/{x}/{y}.png`}</em>
          </li>
        </ul>
      </div>

      <div className="relative grow">
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
                  <Layer key={RASTER_LAYER.id} {...RASTER_LAYER} />
                </LayerManager>
                <Controls>
                  <ZoomControl id={id} />
                </Controls>
              </>
            );
          }}
        </Map>
      </div>
    </div>
  );
};

export const Raster01 = Template.bind({});
Raster01.args = {
  id: 'raster',
  className: '',
  viewport: {},
  initialViewState: {},
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
