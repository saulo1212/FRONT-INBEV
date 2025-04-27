'use client';

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMap } from 'react-leaflet';

export default function UseMap({ defaultCenter, selectedPosition }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPosition) {
      const gps = selectedPosition.bodyPosition.gps[0];

      map.setView([gps.latitude, gps.longitude], 17);
    } else {
      map.setView(defaultCenter, 3);
    }
  }, [selectedPosition]);

  return null;
}

UseMap.propTypes = {
  defaultCenter: PropTypes.array,
  selectedPosition: PropTypes.object,
};
