import { useState } from 'react';

import flatten from 'lodash/flatten';

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
  const [layersInteractiveIds, setLayersInteractiveIds] = useState([]);

  const colors = [
    '#a3f307',
    '#05f9e2',
    '#e2f705',
    '#f50b86',
    '#ff6f00',
    '#a3f307',
    '#05f9e2',
    '#e2f705',
    '#f50b86',
    '#ff6f00',
    '#a3f307',
    '#05f9e2',
    '#e2f705',
    '#f50b86',
    '#ff6f00',
    '#a3f307',
    '#05f9e2',
    '#e2f705',
    '#f50b86',
    '#ff6f00',
  ];

  const rampPopScore = flatten(
    colors.map((c, i) => {
      return [i, c];
    })
  );

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
          'source-layer': 'Indicators',
          paint: {
            'fill-color': ['match', ['get', 'bws_cat'], ...rampPopScore, '#DDD'],
          },
        },
      ],
    },
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

  const styles = {
    code: { background: 'black', borderRadius: '4px', color: 'white' },
    properties: {
      margin: '10px',
      background: '#D67CAE',
      borderRadius: '4px',
      color: 'white',
      padding: '10px',
    },
  };

  return (
    <div className="relative w-full h-screen">
      <p>
        Draw a vector-tiles layer with a Mapbox tileset, tileset ID{' '}
        <span style={styles.code}>&nbsp;&nbsp;layer-manager.1ecpue1k&nbsp;&nbsp;</span>, with a
        color ramp base on an attribute number, center it on the map and display them with following
        styles:
      </p>
      <ul style={styles.properties}>
        <li>color: #77CCFF</li>
        <li>border: #0044FF</li>
        <li>borderWidth: 1</li>
        <li>opacity: 0.5</li>
      </ul>
      <Map
        id={id}
        bounds={bounds}
        viewState={viewState}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        interactiveLayerIds={layersInteractiveIds}
        onMapViewStateChange={(v) => {
          setViewState(v);
        }}
      >
        {(map) => {
          return (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}>
                <Layer
                  key={MAPBOX_LAYER.id}
                  onAfterAdd={onAfterAdd}
                  onAfterRemove={onAfterRemove}
                  {...MAPBOX_LAYER}
                />
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

export const Mapbox02 = Template.bind({});
Mapbox02.args = {
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
