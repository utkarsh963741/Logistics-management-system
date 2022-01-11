import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Marker,Popup } from 'react-leaflet'

function DraggableMarker(props) {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState({'lat':props.lat,'lng':props.lng})
    const markerRef = useRef(null)
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
    },[position])
  
    return (
      <Marker
        draggable={props.draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
      </Marker>
    )
  }
  
  export default DraggableMarker