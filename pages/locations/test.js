import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
// import { Polyline } from 'react-leaflet'


function map() {

    const [location_data, setLocationData] = useState(null)
    const [route, setRoute] = useState(null)

    async function getRoute() {
        const response = await fetch('https://api.mapbox.com/directions/v5/mapbox/driving/76.6387373250567,12.284404912020044;76.66012003332342,12.312917625017128?annotations=maxspeed&overview=full&geometries=geojson&access_token=pk.eyJ1IjoidmluZWV0aDEzIiwiYSI6ImNreTY2emY4cTBkaTAyb3BmYWJ6eDBoY24ifQ.h1v4PPd5PheueCpIgdMKaw')
        const data = await response.json()
        // console.log(data)
        const route_points = data.routes[0].geometry.coordinates
        // console.log(route_points)

        let routeData = []

        route_points.forEach(element => {
            routeData.push([element[1],element[0]])
        });

        console.log(routeData)
        setRoute(routeData)
        
    }

    const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
        ssr: false
    })

    const DraggableMarkerWithNoSSR = dynamic(() => import("../../components/DraggableMarker"), {
        ssr: false
    })

    const PolylineWithNoSSR=dynamic(()=>import("../../components/PolyLine"),{
        ssr:false
    })

    useEffect(() => {
        fetchData();
        getRoute();
    }, [])

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('establishment')
                .select(`*`)
            if (data) {
                console.log(data)
                setLocationData(data)
            }
        }
        catch {
            alert(error.message)
        }
    }


    if (location_data && route) {
        var Locations = [...location_data].map(item => {
            return (
                <DraggableMarkerWithNoSSR
                    lat={item.latitude}
                    lng={item.longitude}
                    draggable={false}
                    returnValues={null}
                    color={item.type == "Factory" ? 'red' : item.type == "Warehouse" ? 'yellow' : 'blue'}
                    popup_data={item.type + " - " + item.eid} />
            )
        })
        return (
            <div>
                <Layout>
                    <div id="map" style={{ height: "100%", width: "100%" }}>
                        <MapWithNoSSR returnCoordinates={null} zoom={12} posx={12.284529832373737} posy={76.64039565005605}>
                            <div>
                                {Locations}
                                <PolylineWithNoSSR positions={route}/>
                            </div>
                        </MapWithNoSSR>
                    </div>
                </Layout>
            </div>
        )
    }

    else {
        return (
            <div>
                <Layout>
                </Layout>
            </div>
        )
    }

}

export default map
