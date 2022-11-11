import { useState } from 'react';

import { ViewState } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';

import Code from 'components/code';
import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';

const StoryMap = {
  title: 'Exercises/Basic/Bounds',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const [viewState, setViewState] = useState<Partial<ViewState>>();

  return (
    <>
      <div className="prose">
        <h2>Basic: Bounds 01</h2>
        <p>Display a map and center directly in these bounds: </p>
        <Code>{`bounds = [28.969005,-27.926807,60.192150,-13.144044]`}</Code>
      </div>
      <div className="relative grow">
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
                  {/* <Layer /> */}
                </LayerManager>
                <Controls>
                  <ZoomControl id={id} />
                </Controls>
              </>
            );
          }}
        </Map>
      </div>
    </>
  );
};

export const Bounds01 = Template.bind({});
Bounds01.args = {
  id: 'basic',
  className: '',
  viewport: {},
  initialViewState: {
    bounds: [28.969005, -27.926807, 60.19215, -13.144044],
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
