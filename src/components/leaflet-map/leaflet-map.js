'use client';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import UseMap from './use-map';
import PopUpCard from './popup-card';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function LeafletMap({ positions, selectedPosition = null }) {
  const centerPosition = [-13.6632305, -69.6410913];

  return (
    <MapContainer center={centerPosition} zoom={3} style={{ width: '100%', height: '340px' }}>
      <UseMap {...{ selectedPosition, defaultCenter: centerPosition }} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {!selectedPosition &&
        positions.map((position) => {
          const gps = position.bodyPosition.gps[0];

          return (
            <Marker key={position._id} position={[gps.latitude, gps.longitude]}>
              <Popup>
                <PopUpCard
                  {...{
                    gpsData: gps,
                    nameClient: position.nameClient,
                    vehiclePlate: position.vehiclePlate,
                    communicationUnix: position.bodyPosition.unixCreatedTime,
                  }}
                />
              </Popup>
            </Marker>
          );
        })}
      {selectedPosition && (
        <Marker
          position={[
            selectedPosition.bodyPosition.gps[0].latitude,
            selectedPosition.bodyPosition.gps[0].longitude,
          ]}
        >
          <Popup>
            <PopUpCard
              {...{
                nameClient: selectedPosition.nameClient,
                vehiclePlate: selectedPosition.vehiclePlate,
                gpsData: selectedPosition.bodyPosition.gps[0],
                communicationUnix: selectedPosition.bodyPosition.unixCreatedTime,
              }}
            />
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

LeafletMap.propTypes = {
  positions: PropTypes.array,
  selectedPosition: PropTypes.object,
};
