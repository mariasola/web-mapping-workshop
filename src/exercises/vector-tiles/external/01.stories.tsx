import { useState } from 'react';

import { ViewState } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Code from 'components/code';
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

  const [viewState, setViewState] = useState<Partial<ViewState>>();

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
    <>
      <div className="prose">
        <h2>Vector tiles: External 01</h2>
        <p>
          Draw a vector tiles layer, center it on the map and display it with the following styles:
        </p>
        <Code>
          {`border = '#0044FF';
borderWidth = 1;
color = '#77CCFF';`}
        </Code>
        <p>You should use this url source:</p>
        <pre>
          {`https://vectortileservices3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Santa_Monica_Mountains_Parcels_VTL/VectorTileServer/tile/{z}/{y}/{x}.pbf`}
        </pre>
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
                <Layer key={EXTERNAL_LAYER.id} {...EXTERNAL_LAYER} />
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

export const External01 = Template.bind({});
External01.args = {
  id: 'vector-tiles-external',
  className: '',
  viewport: {},
  initialViewState: {
    bounds: [-118.892506, 33.941821, -118.404644, 34.14693],
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
