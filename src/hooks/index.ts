import { useMemo } from 'react';

import { UseGeoJSONLayer } from './types';

export function useGeoJsonLayer({ id, active, data }: UseGeoJSONLayer) {
  return useMemo(() => {
    if (!active || !id || !data) return null;

    return {
      id: `${id}`,
      type: 'geojson',
      source: {
        type: 'geojson',
        data,
      },
      render: {
        layers: [
          {
            type: 'circle',
            paint: {
              'circle-color': '#FFCC00',
              'circle-opacity': 0.5,
            },
          },
          {
            type: 'line',
            paint: {
              'line-color': '#FF0000',
              'line-width': 3,
            },
          },
        ],
      },
    };
  }, [id, active, data]);
}
