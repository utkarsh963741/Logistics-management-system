import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from 'react';
import DraggableMarker from './DraggableMarker';

const Map = () => {

    const [posx, setPosx] = useState(null)
    const [posy, setPosy] = useState(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {

            setPosx(position.coords.latitude)
            setPosy(position.coords.longitude)
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

        });
    }, [])

    return (
        <>
            {posx && posy ? <MapContainer style={{ height: "100%", width: "100%", zIndex: "100" }} center={[posx, posy]} zoom={14} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {/* <Marker 
        position={[posx,posy]}
        draggable={true}
        animate={true}
        >
            <Popup>
            Hey ! you found me
            </Popup>
        </Marker> */}
                <DraggableMarker lat={posx} lng={posy} draggable={true} />
            </MapContainer> : ""}

        </>
    )
}

export default Map


