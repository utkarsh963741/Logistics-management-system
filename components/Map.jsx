import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { useEffect, useState } from 'react';
import DraggableMarker from './DraggableMarker';

const Map = (props) => {


    // const [posx, setPosx] = useState(12.284529832373737)
    // const [posy, setPosy] = useState(76.64039565005605)
    const [posx, setPosx] = useState(props.posx)
    const [posy, setPosy] = useState(props.posy)


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
            {posx && posy ? <MapContainer style={{ height: "100%", width: "100%", zIndex: "10" }} center={[posx, posy]} zoom={props.zoom?props.zoom:14} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />

                {/* <DraggableMarker lat={posx} lng={posy} draggable={true} returnValues={props.returnCoordinates} /> */}
                
                {props.children}
            
            </MapContainer> : ""}

        </>
    )
}

export default Map


