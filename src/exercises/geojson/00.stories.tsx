import { useMap } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';
// Layer manager
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { LayerManager } from '@vizzuality/layer-manager-react';

// Controls
import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';

// Map

const StoryMap = {
  title: 'Exercises/Geojson',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const cartoProvider = new CartoProvider();

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, maxZoom } = args;
  const { [id]: mapRef } = useMap();

  return (
    <div className="relative w-full h-screen">
      <Map
        id={id}
        maxZoom={maxZoom}
        bounds={bounds}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={(v) => {
          console.info(v);
        }}
      >
        {(map) => (
          <LayerManager
            map={map}
            plugin={PluginMapboxGl}
            providers={{
              [cartoProvider.name]: cartoProvider.handleData,
            }}
          >
            {/* <Layer /> */}
          </LayerManager>
        )}
      </Map>
      <Controls>
        <ZoomControl mapRef={mapRef} />
      </Controls>
    </div>
  );
};

export const G00 = Template.bind({});
G00.args = {
  id: 'map-storybook',
  className: '',
  viewport: {},
  initialViewState: {},
  bounds: {},
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
