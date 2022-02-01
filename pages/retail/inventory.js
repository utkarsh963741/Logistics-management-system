import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function inventory()
{
    const [estd_data, setEstdData] = useState(null)
    const [selected_estd_id, setSelectedEstdID] = useState(null)
    const [inventory_data, setInventoryData] = useState(false)
    const [inventory_options, setInventoryOptions] = useState('')

    useEffect(() => {
        fetchEstdData()
    }, []);

    useEffect(() => {
        UpdateInventoryData()
    }, [inventory_data]);

    function handleEstdChange(id) {
        setSelectedEstdID(id)
        fetchInventoryData(id)
    }

    function UpdateInventoryData() {
        if (inventory_data) {
            let data = [...inventory_data].map((item, index) => {
                return (
                    <div className={styles.product_select} style={{width:"40%"}} key={index}>
                        <img src={"https://kgbtzpfzpiujvhawuxcu.supabase.in/storage/v1/object/public/images/" + item.product.image_url} width="50px" height="50px" style={{ margin: " 10px 10px", borderRadius: "50%" }} />

                        <p style={{ flexGrow: "1" }}>{item.product.name}</p>
                        <p style={{ width: "80px" ,margin:"0 10px"}}>{item.quantity_left}</p>
                        
                    </div>
                )
            })

            setInventoryOptions(data)
        }
    }

    async function fetchEstdData() {
        try {

            let { data, error, status } = await supabase
                .from('establishment')
                .select(`
                eid,
                type,
                latitude,
                longitude,
                capacity
            `)

            if (data) {
                console.log(data)
                setEstdData(data)
            }
            if (error && status !== 406) {
                throw error
            }

        } catch (error) {
            alert(error.message)
        } finally {
            // console.log('store : ',store_data)
        }
    }

    async function fetchInventoryData(eid) {
        try {

            let { data, error, status } = await supabase
                .from('inventory')
                .select(`
                invid,
                eid,
                pid,
                quantity_left,
                product(*)
            `)
            .eq('eid', eid)

            if (data) {
                console.log(data)

                setInventoryData(data)
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


    if (estd_data) {

        var EstdOptions = [...estd_data].map((item, index) => {
            return (<option key={index} value={item.eid}>{item.type+" ID -" + item.eid}</option>)
        })

        return (
            <div>

                <Layout>
                    <div className={styles.container}>
                        <h2 style={{ margin: "10px" }}>List Inventory</h2>
                        <form>
                            <label for="category">Select Establishment</label>
                            <select className={styles.input_box} name="category" onChange={(e) => handleEstdChange(e.target.value)}>
                                <option value="" disabled selected>Choose Establishment...</option>
                                {EstdOptions}
                            </select>

                            <div className={styles.product_select_container}>
                                {inventory_options}
                            </div>

                        </form>
                    </div>

                </Layout>
            </div>
        )
    }
    else {
        return (
            <div>

                <Layout>
                    <div className={styles.container}>
                        <h2 style={{ margin: "10px" }}>List Inventory</h2>
                        <form>
                            <label for="category">Select Establishment</label>
                            <select disabled className={styles.input_box} name="category">
                                <option value="" disabled selected>Choose Establishment...</option>
                            </select>
                        </form>
                    </div>

                </Layout>
            </div>
        )
    }

}

export default inventory