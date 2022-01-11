import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import dynamic from "next/dynamic";
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import { useState } from 'react/cjs/react.development';

function create() {

    const [lat,setLat]=useState(null)
    const [long,setLong]=useState(null)

    const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
        ssr: false
      })

    return (
        <div>

            <Layout>
                <div className={styles.container}>
                    <h2 style={{margin:"10px"}}>Create Establishment</h2>
                    <form>
                    
                        <label for="category">Select Type of Establishment</label>
                        <select className={styles.input_box} name="category">
                            <option value="" disabled selected>Choose Category...</option>
                            <option value="1">Factory</option>
                            <option value="2">Warehouse</option>
                            <option value="3">Store</option>
                        </select>

                        <label for="title">Storage Capacity</label>
                        <input className={styles.input_box} type="number" id="title" name="title" placeholder="Enter Quantity..."/>

                        <label for="title">Location</label>
                        <div className={styles.icon_input_box} style={{display:"flex",alignItems:"center"}}>
                            <i className="fas fa-map-marker-alt" style={{fontWeight:"100"}}></i>
                            <input className={styles.icon_input}  type="number" min="0.00" step="any" id="title" name="title" placeholder="Enter Location..."/>
    
                        </div>
            
                        <div styles={{ height: "80%", width: "75%", zIndex: "100" }}>
                        <MapWithNoSSR ></MapWithNoSSR>
                        </div>
                        
                        <br/>
                    
                        <button className={styles.btn}>Add Location</button>
                    </form>
                </div>
                
            </Layout>
        </div>
    )
}

export default create
