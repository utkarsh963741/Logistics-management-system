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
                    <h2 style={{margin:"10px"}}>Create Vehicle</h2>
                    <form>
                        <label for="category">Select Type</label>
                        <select className={styles.input_box} name="category">
                            <option value="" disabled selected>Choose Category...</option>
                            <option value="1">Truck</option>
                            <option value="2">Van</option>
                            <option value="3">Mini Truck</option>
                        </select>

                        <label for="title">Licence Number</label>
                        <input className={styles.input_box} type="text" id="title" name="title" placeholder="Enter Quantity..."/>

                        <label for="title">Max Quantity</label>
                        <input className={styles.input_box} type="number" id="title" name="title" placeholder="Enter Quantity..."/>
                    
                        <button className={styles.btn}>Add Vehicle</button>
                    </form>
                </div>
                
            </Layout>
        </div>
    )
}

export default create
