import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Marker,Popup } from 'react-leaflet'
import * as L from "leaflet";

function DraggableMarker(props) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState({'lat':props.lat,'lng':props.lng})
    const markerRef = useRef(null)

    const LeafIcon = L.Icon.extend({
      options: {}
    });

    const blue = new LeafIcon({
      iconUrl:
      // "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
        "/icons/map-pins/blue.png"
    }),
    red = new LeafIcon({
      iconUrl:
        "/icons/map-pins/red.png"
    }),
    yellow = new LeafIcon({
      iconUrl:
        "/icons/map-pins/yellow.png"
    }),
    factory = new LeafIcon({
      iconUrl:
        "/icons/map-pins/factory.png"
    }),
    wharehouse = new LeafIcon({
      iconUrl:
        "/icons/map-pins/warehouse.png"
    }),
    store = new LeafIcon({
      iconUrl:
        "/icons/map-pins/store.png"
    });

    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )

    useEffect(()=>{
        console.log(position)
        if(props.returnValues!=null)
          props.returnValues(position)
    },[position])
  
    return (
      <Marker
        draggable={props.draggable}
        eventHandlers={eventHandlers}
        position={position}
        icon={props.icon=='factory'?factory:
              props.icon=='wharehouse'?wharehouse:
              props.icon=='store'?store:
              props.icon=='red'?red:
              props.icon=='yellow'?yellow:
              blue}
        ref={markerRef}>
          {
            props.popup_data?
              <Popup>
                {props.popup_data}
              </Popup>
              :
              ""
          }
          
      </Marker>
    )
  }
  
  export default DraggableMarker