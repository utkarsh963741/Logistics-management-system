import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function create() {
    const [product_data, setProductData] = useState(null)
    const [store_data, setStoreData] = useState(null)
    const [product_options, setProductOptions] = useState('')

    const [loading, setLoading] = useState(false)
    const [selected_store_id, setSelectedStoreID] = useState(null)
    const [name, setName] = useState(false)
    const [phone, setPhone] = useState(false)
    const [retail_data, setRetailData] = useState(false)

    useEffect(() => {
        fetchStoreData()
    }, []);

    useEffect(() => {
        UpdateProductOptions()
    }, [retail_data]);

    function UpdateProductOptions() {
        if (retail_data) {
            let data = [...retail_data].map((item, index) => {
                return (
                    <div className={styles.product_select} key={index}>
                        <img src={"https://kgbtzpfzpiujvhawuxcu.supabase.in/storage/v1/object/public/images/" + item.product.image_url} width="50px" height="50px" style={{ margin: " 10px 10px", borderRadius: "50%" }} />
                        <p style={{ flexGrow: "1" }}>{item.product.name} ({item.quantity_left})</p>

                        <i
                            className='fal fa-minus-circle'
                            style={{ fontSize: "30px", color: "var(--color-primary)", margin: "0px 20px" }}
                            onClick={e => handleQuantityChange(index, -1)}
                        />

                        <input
                            className={styles.input_box}
                            style={{ width: "80px" }}
                            type="number" id="quantity" name="quantity"
                            value={retail_data[index].quantity}
                        // onChange={(e) => handleQuantityChange(index,e.target.value)}
                        />

                        <i
                            className='fal fa-plus-circle'
                            style={{ fontSize: "30px", color: "var(--color-primary)", margin: "0px 20px" }}
                            onClick={e => handleQuantityChange(index, 1)}
                        />
                    </div>
                )
            })

            setProductOptions(data)
        }
    }

    function handleStoreChange(id) {
        setSelectedStoreID(id)
        fetchProductData(id)
    }

    function handleQuantityChange(ind, num) {
        let data = retail_data

        if (data[ind].quantity_left < data[ind].quantity + num || data[ind].quantity + num < 0)
            return

        // console.log(retail_data[ind])
        data[ind].quantity = data[ind].quantity + num
        setRetailData(data)
        // console.log(retail_data)
        UpdateProductOptions()
    }

    async function fetchStoreData() {
        try {

            let { data, error, status } = await supabase
                .from('establishment')
                .select(`
                eid,
                type,
                latitude,
                longitude,
                capacity
            `).eq('type', 'Store')

            if (data) {
                console.log(data)
                setStoreData(data)
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

    async function fetchProductData(sid) {
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
                .eq('eid', sid)

            if (data) {
                console.log(data)
                let prods = []
                data.forEach(element => {
                    element.quantity = 0
                    prods.push(element)
                });

                setProductData(data)
                setRetailData(prods)
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

    function AddRetail({ e,selected_store_id, retail_data, name, phone }) {
        console.log("button press", selected_store_id, name, phone, retail_data)
        e.preventDefault()

        try {
            setLoading(true)

            retail_data.forEach(element => {
                if (element.quantity > 0) {
                    let data = {
                        "pid": element.pid,
                        "sid": selected_store_id,
                        "customer_name": name,
                        "customer_ph_no": phone,
                        "quantity": element.quantity
                    }

                    supabase.from('retail').insert(data).then(e => { console.log(e) })

                    supabase.from('inventory').upsert(
                        {
                            'invid':element.invid,
                            'eid':element.eid,
                            'pid':element.pid,
                            'quantity_left':element.quantity_left-element.quantity,
                        }
                    )
                    .then(e=> {console.log(e)})
                }

            });

        } catch {
            console.log("error")
            fetchProductData(selected_store_id)
        } finally {
            fetchProductData(selected_store_id)
            setLoading(false)
        }
    }

    if (store_data) {

        var storeOptions = [...store_data].map((item, index) => {
            return (<option key={index} value={item.eid}>{"Store ID -" + item.eid}</option>)
        })

        return (
            <div>

                <Layout>
                    <div className={styles.container}>
                        <h2 style={{ margin: "10px" }}>Add Sales</h2>
                        <form>
                            <label for="category">Select Store</label>
                            <select className={styles.input_box} name="category" onChange={(e) => handleStoreChange(e.target.value)}>
                                <option value="" disabled selected>Choose Store...</option>
                                {storeOptions}
                            </select>

                            <label>Customer Name</label>
                            <input
                                className={styles.input_box}
                                type="text" id="name" name="name"
                                placeholder="Enter Customer Name..."
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label>Customer Phone Number</label>
                            <input
                                className={styles.input_box}
                                type="tel" id="phone" name="phone"
                                placeholder="Enter Customer Phone Number..."
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <div className={styles.product_select_container}>
                                {product_options}
                            </div>


                            <button className={styles.btn} onClick={(e) => AddRetail({e, selected_store_id, retail_data, name, phone })}>{loading?'Loading...':'Add to Sales'}</button>

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
                        <h2 style={{ margin: "10px" }}>Add Sales</h2>
                        <form>
                            <label for="category">Select Store</label>
                            <select disabled className={styles.input_box} name="category">
                                <option value="" disabled selected>Choose Store...</option>
                            </select>

                            <label>Customer Name</label>
                            <input
                                disabled
                                className={styles.input_box}
                                type="text" id="name" name="name"
                                placeholder="Enter Customer Name..."
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label>Customer Phone Number</label>
                            <input
                                disabled
                                className={styles.input_box}
                                type="tel" id="phone" name="phone"
                                placeholder="Enter Customer Phone Number..."
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <button className={styles.btn}>Add to Sales</button>
                        </form>
                    </div>

                </Layout>
            </div>
        )
    }
}

export default create
