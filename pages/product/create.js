import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function create() {

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [time, setTime] = useState(null)

    async function AddProduct({ name, price, time }) {
        try {
          setLoading(true)
    
          const data = {
            "name":name,
            "price":price,
            "production_time":time
          }
    
          let { error } = await supabase.from('product').upsert(data, {
            returning: 'minimal', // Don't return the value after inserting
          })
    
          if (error) {
            throw error
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
      }

    return (
        <div>

            <Layout>
                <div className={styles.container}>
                    <h2 style={{margin:"10px"}}>Create New Product Type</h2>
                    <div>

                        <label>Product Name</label>
                        <input 
                            className={styles.input_box} 
                            type="text" id="name" name="name" 
                            placeholder="Enter Name of Product..."
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Product Price</label>
                        <div className={styles.icon_input_box} style={{display:"flex",alignItems:"center"}}>
                            <i className="fas fa-rupee-sign" style={{fontWeight:"100"}}></i>
                            <input 
                                className={styles.icon_input}  
                                type="number" min="0.00" step="any" id="price" name="price" 
                                placeholder="Enter Price of Product..."
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <label>Production Time</label>
                        <div className={styles.icon_input_box} style={{display:"flex",alignItems:"center"}}>
                            <i className="fas fa-clock" style={{fontWeight:"100"}}></i>
                            <input 
                                className={styles.icon_input}  
                                type="number" min="0.00" step="any" id="time" name="time" 
                                placeholder="Enter time required for Production..."
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    
                        <button 
                            className={styles.btn}
                            onClick={() => AddProduct({ name, price, time })}
                            disabled={loading}
                        >
                            {loading ? 'Loading ...' : 'Add Product Type'}
                        </button>
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default create
