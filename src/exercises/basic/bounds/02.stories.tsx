import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';

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

  const [viewState, setViewState] = useState(initialViewState);

  return (
    <>
      <div className="prose">
        <div className="prose">
          <h2>Basic: Bounds 02</h2>
          <p>
            Display a map and center making it animate to the final position with these bounds:{' '}
          </p>
          <pre>[28.969005,-27.926807,60.192150,-13.144044]</pre>
        </div>
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

export const Bounds02 = Template.bind({});
Bounds02.args = {
  id: 'basic',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {
    bbox: [28.969005, -27.926807, 60.19215, -13.144044],
    options: { padding: 50, duration: 5000 },
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
