import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function add() {
    return (
        <div>

            <Layout>
                <div className={styles.container}>
                    <h2 style={{margin:"10px"}}>Add Items to Production</h2>
                    <form>
                    
                        <label for="category">Select Product</label>
                        <select className={styles.input_box} name="category">
                            <option value="" disabled selected>Choose Category...</option>
                            <option value="1">Vanilla</option>
                            <option value="2">Chocolate</option>
                            <option value="3">Strawberry</option>
                        </select>

                        <label for="title">Select Factory</label>
                        <select className={styles.input_box} name="category">
                            <option value="" disabled selected>Choose Factory...</option>
                            <option value="1">Factory 1</option>
                            <option value="2">Factory 2</option>
                            <option value="3">Factory 3</option>
                        </select>

                        <label for="title">Quantity</label>
                        <input className={styles.input_box} type="number" id="title" name="title" placeholder="Enter Quantity..."/>
                    
                        <button className={styles.btn}>Add to Production</button>
                    </form>
                </div>
                
            </Layout>
        </div>
    )
}

export default add
