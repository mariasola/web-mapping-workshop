import { useCallback, useState } from 'react';

import { useMap, ViewState, MapProvider } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';
// Layer manager
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

// Controls
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';

// Map
import Map from '../component';
import { CustomMapProps } from '../types';

import LAYERS from './layers';

const StoryMap = {
  title: 'Examples/Fitbounds vs Center + Zoom',
  component: Map,
  decorators: [
    (MapStory: Story) => (
      <MapProvider>
        <MapStory />
      </MapProvider>
    ),
  ],
};

export default StoryMap;

const cartoProvider = new CartoProvider();

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { initialViewState } = args;
  const [viewState, setViewState] = useState<Partial<ViewState>>({});
  const { 'fitbounds-example': fitBoundsMapRef } = useMap();
  const { 'center-example': centerMapRef } = useMap();

  const handleViewState = useCallback((vw) => {
    setViewState(vw);
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="relative w-1/2 h-screen">
        <Map
          id="fitbounds-example"
          bounds={{
            bbox: [10.5194091796875, 43.6499881760459, 10.9588623046875, 44.01257086123085],
            options: {
              duration: 0,
            },
          }}
          mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
          onMapViewStateChange={() => {}}
        >
          {(map) => (
            <LayerManager
              map={map}
              plugin={PluginMapboxGl}
              providers={{
                [cartoProvider.name]: cartoProvider.handleData,
              }}
            >
              {LAYERS.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
          )}
        </Map>
        <Controls>
          <ZoomControl mapRef={fitBoundsMapRef} />
        </Controls>
      </div>
      <div className="relative w-1/2 h-screen">
        <Map
          id="center-example"
          initialViewState={initialViewState}
          viewState={viewState}
          mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
          onMapViewStateChange={handleViewState}
        >
          {(map) => (
            <LayerManager
              map={map}
              plugin={PluginMapboxGl}
              providers={{
                [cartoProvider.name]: cartoProvider.handleData,
              }}
            >
              {LAYERS.map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
          )}
        </Map>
        <Controls>
          <ZoomControl mapRef={centerMapRef} />
        </Controls>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  className: '',
  viewport: {},
  initialViewState: {
    latitude: 43.831554866624145,
    longitude: 10.7391357421875,
    zoom: 10.005624549193877,
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
  maxZoom: 20,
};
