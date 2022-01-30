import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

function map() {

    const [location_data, setLocationData] = useState(null)

    const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
        ssr: false
      })

      const DraggableMarkerWithNoSSR = dynamic(() => import("../../components/DraggableMarker"), {
        ssr: false
      })

      useEffect(()=>{
        fetchData();
    },[])

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

    
    if(location_data)
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
        return (
            <div>
                <Layout>
                    <div id="map" style={{ height: "100%", width: "100%" }}>
                    <MapWithNoSSR returnCoordinates={null} zoom={12} posx={12.284529832373737} posy={76.64039565005605}>
                        <div>
                        {Locations}
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
