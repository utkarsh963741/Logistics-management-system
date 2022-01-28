import {useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'

function polyLine(props){
    const polylineRef = useRef(null)
    

    return(
        <Polyline
            pathOptions={{ color: 'lime' }} 
            positions={props.positions} 
            ref={polylineRef}
        />
    )
}

export default polyLine


// import {useRef } from 'react'
// import {AntPath} from 'leaflet-ant-path';
// import AntPath from 'react-leaflet-ant-path'

// function polyLine(props){
//         const polylineRef = useRef(null)

//         const options={
//         "delay": 624,
//         "dashArray": [
//           21,
//           12
//         ],
//         "weight": 3,
//         "color": "#0000FF",
//         "pulseColor": "#FFFFFF",
//         "paused": false,
//         "reverse": false,
//         "hardwareAccelerated": true
//     }

//     return(
//         <>
//         <AntPath positions={props.positions} options={options} ref={polylineRef}/>    
//         </>
//     )
// }

// export default polyLine  