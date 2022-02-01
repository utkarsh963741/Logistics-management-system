import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function add() {
    const [product_data, setProductData] = useState(null)
    const [factory_data, setFactoryData] = useState(null)

    const [loading, setLoading] = useState(false)
    const [selected_factory_id, setSelectedFactoryID] = useState(null)
    const [selected_product_id, setSelectedProductID] = useState(null)
    const [quantity, setQuantity] = useState(null)

    useEffect(() => {
        fetchProductData()
        fetchFactoryData()
    },[]);

    async function fetchProductData(){
        try {

            let { data, error, status } = await supabase
            .from('product')
            .select(`
                pid,
                name,
                production_time
            `)
    
            if(data){
                console.log(data)
                setProductData(data)
            }
            if (error && status !== 406) {
            throw error
            }
    
        } catch (error) {
            alert(error.message)
        } finally {
            // console.log('structure : ',structure_data)
        }
    }

    async function fetchFactoryData(){
        try {

            let { data, error, status } = await supabase
            .from('establishment')
            .select(`
                eid,
                type,
                latitude,
                longitude,
                capacity
            `).eq('type', 'Factory')
    
            if(data){
                console.log(data)
                setFactoryData(data)
            }
            if (error && status !== 406) {
            throw error
            }
    
        } catch (error) {
            alert(error.message)
        } finally {
            // console.log('factories : ',factory_data)
        }
    }

    async function AddProduction({ selected_factory_id, selected_product_id, quantity }) {
        try {
          setLoading(true)
          console.log()
          var d = new Date(Date.now());
          d.setMinutes(d.getMinutes() + (quantity*product_data[selected_product_id].production_time));
          const data = {
            "pid":product_data[selected_product_id].pid,
            "fid":selected_factory_id,
            "expected_completion":d,
            "status":"under production",
            "quantity":quantity
          }

          console.log(data)
    
          let { error } = await supabase.from('production').upsert(data, {
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

    if(product_data && factory_data)
    {
        var productOptions = [...product_data].map((item,index)=>{
            return(<option key={index} value={index}>{item.name}</option>)
        })

        var factoryOptions = [...factory_data].map((item,index)=>{
            return(<option key={index} value={item.eid}>{"Factory ID -"+item.eid}</option>)
        })

        return (
            <div>

                <Layout>
                    <div className={styles.container}>
                        <h2 style={{margin:"10px"}}>Add Items to Production</h2>
                        <div>
                        
                            <label>Select Product</label>
                            <select className={styles.input_box} name="category" onChange={(e) => setSelectedProductID(e.target.value)}>
                                <option value="" disabled selected>Choose Product Category...</option>
                                {productOptions}
                            </select>

                            <label>Select Factory</label>
                            <select className={styles.input_box} name="category" onChange={(e) => setSelectedFactoryID(e.target.value)}>
                                <option value="" disabled selected>Choose Factory...</option>
                                {factoryOptions}
                            </select>

                            <label >Quantity</label>
                            <input className={styles.input_box} type="number" id="title" name="title" placeholder="Enter Quantity..." onChange={(e) => setQuantity(e.target.value)}/>
                        

                            <button 
                                className={styles.btn}
                                onClick={() => AddProduction({ selected_factory_id, selected_product_id, quantity })}
                                disabled={loading}
                            >
                                {loading ? 'Loading ...' : 'Add to Production'}
                            </button>
                        </div>
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
                    <div className={styles.container}>
                        <h2 style={{margin:"10px"}}>Add Items to Production</h2>
                        <div>
                        
                            <label>Select Product</label>
                            <select disabled className={styles.input_box} name="category">
                                <option value="" disabled selected>Choose Category...</option>
                            </select>

                            <label>Select Factory</label>
                            <select disabled className={styles.input_box} name="category">
                                <option value="" disabled selected>Choose Factory...</option>
                            </select>

                            <label >Quantity</label>
                            <input className={styles.input_box} disabled type="number" id="title" name="title" placeholder="Enter Quantity..."/>
                        
                            <button disabled className={styles.btn}>Add to Production</button>
                        </div>
                    </div>
                    
                </Layout>
            </div>
        )  
    }
    
}

export default add
