import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";
import Table from '../../components/Table'
import Link from 'next/link'


function Estd() {
    const [EstdData,setEstdData]=useState(null)

    const router = useRouter();
    const { eid } = router.query;

    const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
        ssr: false
      })

      const DraggableMarkerWithNoSSR = dynamic(() => import("../../components/DraggableMarker"), {
        ssr: false
      })

    useEffect(()=>{
        fetchData();
    },[eid])

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('establishment')
                .select(`*,inventory(*,product(*))`)
                .eq('eid',eid)
            if(data){
                var datafin=[]
                data.forEach(element => {
                    let sum =0
                    let date = new Date(element.created_at)
                    element.inventory.forEach(val=>{
                        sum+=val.quantity_left
                    })
                    let temp = element
                    temp.curr_capacity = sum
                    temp.created_at = date.toDateString()+' '+date.toLocaleTimeString()
                    console.log(temp)
                    datafin.push(temp)
                });
                setEstdData(datafin[0])
                console.log(datafin[0])
            }
        }
        catch(e){
            console.log(e)
        }
    }

    if(EstdData)
    {

        let inventory_data = [...EstdData.inventory].map((item, index) => {
            return (
                <div className={styles.product_select} style={{width:"40%"}} key={index}>
                    <img src={"https://kgbtzpfzpiujvhawuxcu.supabase.in/storage/v1/object/public/images/" + item.product.image_url} width="50px" height="50px" style={{ margin: " 10px 10px", borderRadius: "50%" }} />

                    <p style={{ flexGrow: "1" }}>{item.product.name}</p>
                    <p style={{ width: "80px" ,margin:"0 10px"}}>{item.quantity_left}</p>
                    
                </div>
            )
        })
        return (
            <div>
    
                <Layout>
                
                    <div className={styles.container}>
                        
                        <h1> 
                            <Link href={"/locations/list"}>
                                <i className="fas fa-arrow-circle-left" style={{cursor:"pointer",marginRight:'10px'}}></i>
                            </Link> 
                            {EstdData.type} - {EstdData.eid}
                        </h1>
                        
                        <p><b>Created at :</b> {EstdData.created_at}</p>
                        <p style={{display:"flex"}}><b>Status : </b> <b style={{color:"green",marginLeft:'10px'}}>{EstdData.status}</b></p>

                        <p><b>Current Capacity :</b> {EstdData.curr_capacity}/{EstdData.capacity}</p>

                        <div className={styles.product_select_container}>
                            {inventory_data}
                        </div>

                        <div style={{ height: "220px", width: "100%" }}>
                        <MapWithNoSSR posy={EstdData.longitude} posx={EstdData.latitude} zoom={12}>
                          <div>
                          <DraggableMarkerWithNoSSR 
                            lat={EstdData.latitude}
                            lng={EstdData.longitude}
                            icon={EstdData.type=="Factory"?'factory':EstdData.type=="Warehouse"?'wharehouse':EstdData.type=="Store"?'store':''}
                            draggable={false} 
                            />
                          </div>
                          </MapWithNoSSR>
                        </div>

                    </div>
    
                </Layout>
            </div>
        )

    }
    else
    return(
        <div>
            <Layout>

            </Layout>
        </div>
    )
}


export default Estd