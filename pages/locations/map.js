import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

function map() {

    const [location_data, setLocationData] = useState(null)
    const [route, setRoute] = useState(null)

    const [routes, setRoutes] = useState(null)
    const [tarnsport, setTransport] = useState(null)

    const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
        ssr: false
      })

      const DraggableMarkerWithNoSSR = dynamic(() => import("../../components/DraggableMarker"), {
        ssr: false
      })

      const PolylineWithNoSSR=dynamic(()=>import("../../components/PolyLine"),{
        ssr:false
    })

      useEffect(()=>{
        fetchData();
        fetchRoutes();
        // fetchTransport();
    },[])

    useEffect(()=>{
        if(routes)
            fetchTransport();
    },[routes])

      async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('establishment')
                .select(`*`)
            if(data){
                console.log(data)
                setLocationData(data)
            }
        }
        catch{
            alert(error.message)
        }
    }

    async function fetchRoutes() {
        try {
            const { data, error } = await supabase
                .from('route')
                .select(`*`)
            if(data){
                console.log(data)
                setRoutes(data)
            }
        }
        catch{
            alert(error.message)
        }
    }

    async function fetchTransport()
    {
        try {
            const { data, error } = await supabase
                .from('transport')
                .select(`*`)
                .eq('status','enroute')
            if(data){
                // console.log(data)
                setTransport(data)
                let temp_route=[]

                data.forEach(elem=>{
                    // console.log(routes)
                    elem.route = routes.filter(obj=>{ return obj.from == elem.to && obj.to == elem.from})[0].waypoints
                    console.log(elem)
                    temp_route.push(elem)
                })

                setRoute(temp_route)
            }
        }
        catch(e){
            console.log(e)
        }
        
    }

    
    if(location_data && route)
    {
        var Locations = [...location_data].map(item=>{
            return(
            <DraggableMarkerWithNoSSR 
                lat={item.latitude} 
                lng={item.longitude} 
                draggable={false} 
                returnValues={null}
                icon={item.type=="Factory"?'factory':item.type=="Warehouse"?'wharehouse':item.type=="Store"?'store':''}
                popup_data={item.type+" - "+item.eid}/>
            )
        })

        var Routes = [...route].map(item => {

            let routeData = []
            console.log(item)

            item.route.data.forEach(element => {
                routeData.push([element[1],element[0]])
            });

            return (
                <PolylineWithNoSSR positions={routeData} popup_data={item}/>
            )
        })

        return (
            <div>
                <Layout>
                    <div id="map" style={{ height: "100%", width: "100%" }}>
                    <MapWithNoSSR returnCoordinates={null} zoom={12} posx={12.284529832373737} posy={76.64039565005605}>
                        <div>
                        {Locations}
                        {Routes}
                        </div>
                    </MapWithNoSSR>
                    </div>
                </Layout>
            </div>
        )
    }

    else
    {
        return (
            <div>
                <Layout>
                </Layout>
            </div>
        )
    }
    
}

export default map
