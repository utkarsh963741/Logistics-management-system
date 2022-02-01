import React,{useState} from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function create() {
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(null)
    const [licence, setLicence] = useState(null)

    const vehicleData = [
                            {"name":"Truck", "capacity":250, "speed":50},
                            {"name":"Van", "capacity":100, "speed":75},
                        ]

    var vehicleOptions = [...vehicleData].map((item,index)=>{return(<option key={index} value={index}>{item.name}</option>)})

    async function AddVehicle(index, licence) {
        try {
          setLoading(true)

            console.log(vehicleData[index].name,vehicleData[index].capacity,vehicleData[index].speed,licence)
          const data = {
            "licence":licence,
            "type":vehicleData[index].name,
            "capacity":vehicleData[index].capacity,
            "speed":vehicleData[index].speed
          }
    
          let { error } = await supabase.from('vehicle').upsert(data, {
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
                    <h2 style={{margin:"10px"}}>Create Vehicle</h2>
                    <div>
                        <label>Select Type</label>
                        <select className={styles.input_box} name="category"  onChange={(e) => setType(e.target.value)}>
                            <option value="" disabled selected>Choose Category...</option>
                            {vehicleOptions}
                        </select>

                        <label >Licence Number</label>
                        <input className={styles.input_box} type="text" id="title" name="title" 
                            placeholder="Enter Licence Number..."  onChange={(e) => setLicence(e.target.value)}/>
                    
                        <button 
                            className={styles.btn}
                            onClick={() => AddVehicle(type,licence)}
                            disabled={loading}
                        >
                            {loading ? 'Loading ...' : 'Add Vehicle'}
                        </button>
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default create
