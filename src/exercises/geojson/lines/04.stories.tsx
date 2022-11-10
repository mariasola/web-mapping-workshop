import { useState, useRef } from 'react';

import type { MapRef } from 'react-map-gl';
import { ViewState } from 'react-map-gl';

import { Story } from '@storybook/react/types-6-0';
import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { Layer, LayerManager } from '@vizzuality/layer-manager-react';

import Code from 'components/code';
import Map from 'components/map';
import Controls from 'components/map/controls';
import ZoomControl from 'components/map/controls/zoom';
import { CustomMapProps } from 'components/map/types';
import data from 'data/valencia.json';

const StoryMap = {
  title: 'Exercises/Geojson/Lines',
  argTypes: {},
};

export default StoryMap;

const Template: Story<CustomMapProps> = (args: CustomMapProps) => {
  const { id, bounds, initialViewState } = args;

  const mapRef = useRef<MapRef>(null);
  const [viewState, setViewState] = useState<Partial<ViewState>>();
  const [layersInteractiveIds, setLayersInteractiveIds] = useState([]);

  const LAYER = {
    id: 'valencia-routes-gradient',
    type: 'vector',
    source: {
      data,
      type: 'geojson',
      lineMetrics: true,
    },
    render: {
      layers: [
        {
          id: 'valencia-routes-gradient',
          filter: [
            'all',
            ['==', '$type', 'LineString'],
            ['==', 'name', 'Avinguda de Peris i Valero'],
          ],
          type: 'line',
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-width': 5,
            'line-opacity': 0.5,
            'line-color': '#FE4365',
            'line-dasharray': [0, 2, 2],
          },
        },
      ],
    },
  };

  const handleMapLoad = ({ map }) => {
    mapRef.current = map;
  };

  const onAfterAdd = (layerModel) => {
    layerModel.mapLayer.layers.forEach((l) => {
      const { id: layerId } = l;
      if (!layersInteractiveIds.includes(layerId)) {
        setLayersInteractiveIds((prevLayersInteractiveIds) => [
          ...prevLayersInteractiveIds,
          layerId,
        ]);
      }
    });
  };

  const onAfterRemove = (layerModel) => {
    layerModel.mapLayer.layers.forEach((l) => {
      const { id: layerId } = l;

      if (layersInteractiveIds.includes(layerId)) {
        setLayersInteractiveIds((prevLayersInteractiveIds) => {
          const arr = prevLayersInteractiveIds.filter((e) => e !== layerId);

          return arr;
        });
      }
    });
  };

  return (
    <>
      <div className="prose">
        <h2>Geojson: Lines 04</h2>
        <b>Animate</b> a geojson linestring collection, center the map on it and display it with the
        following styles:
        <Code>{`const color = '#FE4365';
const opacity = 0.5;`}</Code>
      </div>
      <Map
        id={id}
        bounds={bounds}
        initialViewState={initialViewState}
        viewState={viewState}
        onMapLoad={handleMapLoad}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={(v) => {
          setViewState(v);
        }}
        interactiveLayerIds={layersInteractiveIds}
      >
        {(map) => {
          return (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                <Layer
                  key={LAYER.id}
                  {...LAYER}
                  onAfterAdd={onAfterAdd}
                  onAfterRemove={onAfterRemove}
                />
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

export const Lines04 = Template.bind({});
Lines04.args = {
  id: 'valencia-provinces',
  className: '',
  viewport: {},
  initialViewState: {
    bounds: [-0.477576, 39.389689, -0.257849, 39.542355],
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
