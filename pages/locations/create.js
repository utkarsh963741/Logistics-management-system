import React,{useState,useRef} from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import dynamic from "next/dynamic";
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'


function create() {

    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(null)
    const [capacity, setCapacity] = useState(null)
     
    const latitudeRef = useRef(null)
    const longitudeRef = useRef(null)

    const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
        ssr: false
      })

      const DraggableMarkerWithNoSSR = dynamic(() => import("../../components/DraggableMarker"), {
        ssr: false
      })

    const updateCoordinates = (coords) => {
        //   setLatitude(coords.lat)
        //   setLongitude(coords.lng)
        latitudeRef.current.value = coords.lat
        longitudeRef.current.value = coords.lng
    }

    async function AddEstblishment(type, capacity, latitude, longitude) {
        try {
          setLoading(true)
          console.log(type,capacity,longitude,latitude)
            
          const data = {
            "type":type,
            "capacity":capacity,
            "latitude":latitude,
            "longitude":longitude,
            "status":"active"
          }
    
          let { error } = await supabase.from('establishment').upsert(data, {
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
                    <h2 style={{margin:"10px"}}>Create Establishment</h2>
                    <div>
                    
                        <label >Select Type of Establishment</label>
                        <select className={styles.input_box} name="category" onChange={(e) => setType(e.target.value)}>
                            <option value="" disabled selected>Choose Category...</option>
                            <option value="Factory">Factory</option>
                            <option value="Warehouse">Warehouse</option>
                            <option value="Store">Store</option>
                        </select>

                        <label >Storage Capacity</label>
                        <input className={styles.input_box} type="number" id="title" name="title" 
                        placeholder="Enter Quantity..." onChange={(e) => setCapacity(e.target.value)}/>

                        <label >Location</label>
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                            <div className={styles.icon_input_box} style={{display:"flex",alignItems:"center",width:"49%"}}>
                                <i className="fas fa-map-marker-alt" style={{fontWeight:"100",marginRight:"10px"}}></i>
                                <input className={styles.icon_input} ref={latitudeRef}  type="number" min="0.00" step="any" id="title" name="title" placeholder="Enter Latitude..." disabled/>
                            </div>
                            <div className={styles.icon_input_box} style={{display:"flex",alignItems:"center",width:"49%"}}>
                                <i className="fas fa-map-marker-alt" style={{fontWeight:"100",marginRight:"10px"}}></i>
                                <input className={styles.icon_input} ref={longitudeRef}  type="number" min="0.00" step="any" id="title" name="title" placeholder="Enter Longitude..." disabled/>
                            </div>
                        </div>

                        <div style={{ height: "220px", width: "100%" }}>
                        <MapWithNoSSR returnCoordinates={updateCoordinates} posx={12.284529832373737} posy={76.64039565005605}>
                          <div>
                          <DraggableMarkerWithNoSSR 
                            lat={12.284529832373737} 
                            lng={76.64039565005605} 
                            draggable={true} 
                            returnValues={updateCoordinates}
                            />
                          </div>
                          </MapWithNoSSR>
                        </div>
                        
                        <br/>
                    
                        <button className={styles.btn}
                            onClick={() => 
                                AddEstblishment(type, capacity, latitudeRef.current.value, longitudeRef.current.value )}
                            disabled={loading}>
                              {loading ? 'Loading ...' : 'Add Location'}
                        </button>
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default create
