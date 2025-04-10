

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {
  position: [number, number]; // Define the type for position
  venue: string;
};

export default function MapComponent({position, venue}: Props) {

    console.log('position', position);
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height: '100%'}}>
    <TileLayer
     
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        {venue}
      </Popup>
    </Marker>
  </MapContainer>
  )
}