import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Webpack/Next.js
const fixLeafletIcon = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

// Component to handle map centering and bounds
function MapController({ properties }) {
  const map = useMap();

  useEffect(() => {
    if (properties && properties.length > 0) {
      const bounds = L.latLngBounds(properties.map((p) => [p.coordinates.lat, p.coordinates.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [properties, map]);

  return null;
}

const MapView = ({ properties, activeId, onMarkerClick }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    fixLeafletIcon();
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="h-[400px] w-full bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400">
        Loading Map...
      </div>
    );

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner group">
      <MapContainer
        center={[39.8283, -98.5795]} // Center of USA
        zoom={4}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.coordinates.lat, property.coordinates.lng]}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(property.id),
            }}
          >
            <Popup>
              <div className="p-1 max-w-[200px]">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-24 object-cover rounded-md mb-2"
                />
                <h3 className="font-bold text-sm text-gray-900 leading-tight">{property.title}</h3>
                <p className="text-xs text-indigo-600 font-semibold mt-1 mb-1">{property.price}</p>
                <p className="text-[10px] text-gray-500 truncate">{property.location}</p>
                <div className="flex gap-2 mt-2 text-[10px] text-gray-600 border-t pt-2">
                  <span>{property.bedrooms} Bed</span>
                  <span>{property.bathrooms} Bath</span>
                  <span>{property.area}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        <MapController properties={properties} />
      </MapContainer>
    </div>
  );
};

export default MapView;
