import { useRef, useState } from 'react';

import { MapRef, ViewState } from 'react-map-gl';

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

  const mapRef = useRef<MapRef>(null);
  const HOVER = useRef(null);

  const [viewState, setViewState] = useState<Partial<ViewState>>();

  const [layersInteractiveIds, setLayersInteractiveIds] = useState([]);

  const MAPBOX_LAYER = {
    id: 'vector-tiles-mapbox',
    type: 'vector',
    source: {
      url: 'mapbox://layer-manager.1ecpue1k',
      promoteId: 'geoid',
    },
    render: {
      layers: [
        {
          type: 'fill',
          'source-layer': 'Indicators',
          filter: ['==', 'level', 2],
          paint: {
            'fill-color': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              '#0044FF',
              '#77CCFF',
            ],
          },
        },
        {
          type: 'line',
          'source-layer': 'Indicators',
          filter: ['==', 'level', 2],
          paint: {
            'line-color': '#0044FF',
            'line-width': 1,
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

  const handleMouseMove = (e) => {
    if (e.features) {
      const IndicatorsLayer = e.features.find((f) => f.layer.source === 'vector-tiles-mapbox');

      if (IndicatorsLayer) {
        if (HOVER.current !== null) {
          mapRef.current.setFeatureState(
            {
              id: HOVER.current.properties.geoid,
              source: HOVER.current.layer.source,
              sourceLayer: HOVER.current.layer['source-layer'],
            },
            { hover: false }
          );
        }

        HOVER.current = IndicatorsLayer;

        if (HOVER.current !== null) {
          mapRef.current.setFeatureState(
            {
              id: HOVER.current.properties.geoid,
              source: HOVER.current.layer.source,
              sourceLayer: HOVER.current.layer['source-layer'],
            },
            { hover: true }
          );
        }
      } else {
        if (HOVER.current !== null) {
          mapRef.current.setFeatureState(
            {
              id: HOVER.current.properties.geoid,
              source: HOVER.current.layer.source,
              sourceLayer: HOVER.current.layer['source-layer'],
            },
            { hover: false }
          );
        }
        HOVER.current = null;
      }
    }
  };

  const handleMapLoad = ({ map }) => {
    mapRef.current = map;
  };

  return (
    <>
      <div className="prose">
        <h2>Vector tiles: Mapbox 04</h2>
        <p>
          Draw a vector tiles layer with a Mapbox tileset, center it on the map and color the county
          when <b>hover</b> on it.
          <br />
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
        interactiveLayerIds={layersInteractiveIds}
        onMouseMove={handleMouseMove}
        onMapLoad={handleMapLoad}
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
    </>
  );
};

export const Mapbox04 = Template.bind({});
Mapbox04.args = {
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
  onHover: ({ map, mapContainer }) => {
    console.info('onHover: ', map, mapContainer);
  },
};
