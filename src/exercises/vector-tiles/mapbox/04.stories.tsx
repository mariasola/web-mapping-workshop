import { useState } from 'react';

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
  const [county, setCounty] = useState(null);

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
            'fill-color': '#77CCFF',
            'fill-opacity': 0.5,
          },
        },
        {
          type: 'line',
          'source-layer': 'Indicators',
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
    e.features.map((i) => {
      if (i.properties.level === 2) {
        setCounty(i.properties.name);
      }
    });
  };

  console.info({ county });

  // const styles = {
  //   code: { background: 'black', borderRadius: '4px', color: 'white' },
  //   properties: {
  //     margin: '10px',
  //     background: '#D67CAE',
  //     borderRadius: '4px',
  //     color: 'white',
  //     padding: '10px',
  //   },
  // };

  return (
    <div className="relative w-full h-screen">
      {/* Draw a vector-tiles layer with a Mapbox tileset, tileset ID{' '}
      <span style={styles.code}>&nbsp;&nbsp;layer-manager.1ecpue1k&nbsp;&nbsp;</span>, center it on
      the map and display them as circle clusters with following styles.
      <br />
      Add a counter inside the circles.
      <ul style={styles.properties}>
        <li>
          <b>Circle</b>
        </li>

        <li>color: #ffCC00</li>
        <li>border: #000000</li>
        <li>radius: 20</li>
        <li>opacity: 0.5</li>
        <br />
        <li>
          <b>Cluster</b>
        </li>
        <li>color: #00CC00</li>
        <li>border: #000000</li>
        <li>radius: 50</li>
        <li>opacity: 1</li>
      </ul> */}
      <Map
        id={id}
        bounds={bounds}
        viewState={viewState}
        mapboxAccessToken={process.env.STORYBOOK_MAPBOX_API_TOKEN}
        onMapViewStateChange={(v) => {
          setViewState(v);
        }}
        onMouseMove={handleMouseMove}
        interactiveLayerIds={layersInteractiveIds}
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
      {/* <Tooltip
        arrowProps={{
          className: 'bg-white',
          enabled: true,
          size: 6,
        }}
        content={
          <div className="px-2 py-1 text-gray-500 bg-white rounded">
            <span>{county}</span>
          </div>
        }
        portalProps={{
          enabled: true,
        }}
      ></Tooltip> */}
    </div>
  );
};

export const Mapbox04 = Template.bind({});
Mapbox04.args = {
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
