import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import dynamic from "next/dynamic";
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function create() {

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
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div className={styles.icon_input_box} style={{display:"flex",alignItems:"center",width:"49%"}}>
                                <i className="fas fa-map-marker-alt" style={{fontWeight:"100",marginRight:"10px"}}></i>
                                <input className={styles.icon_input}  type="number" min="0.00" step="any" id="title" name="title" placeholder="Enter Latitude..."/>
                            </div>
                            <div className={styles.icon_input_box} style={{display:"flex",alignItems:"center",width:"49%"}}>
                                <i className="fas fa-map-marker-alt" style={{fontWeight:"100",marginRight:"10px"}}></i>
                                <input className={styles.icon_input}  type="number" min="0.00" step="any" id="title" name="title" placeholder="Enter Longitude..."/>
                            </div>
                        </div>

                        <div style={{ height: "220px", width: "100%" }}>
                        <MapWithNoSSR/>
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
