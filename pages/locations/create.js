import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function create() {
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
                        <iframe id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.535196787511!2d76.63861834894139!3d12.279702091269774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf6557fa108691%3A0x46335fbd1b32437e!2sNIE%20Diamond%20Jubilee%20Block!5e0!3m2!1sen!2sin!4v1640772392044!5m2!1sen!2sin" 
                        style={{height:"200px",width:"100%",border:"none"}}></iframe>
                        <br/>
                    
                        <button className={styles.btn}>Add Location</button>
                    </form>
                </div>
                
            </Layout>
        </div>
    )
}

export default create
