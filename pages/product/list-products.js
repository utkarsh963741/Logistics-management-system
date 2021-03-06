import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import Table from '../../components/Table'


function table() {

    const [tableData,setTableData]=useState(null)

    useEffect(()=>{
        fetchData();
    },[])

    
    const columns = [
        { title: 'PID', field: 'pid' },
        { title: 'Product', field: 'productDetail' },
        { title: 'Production Time', field: 'production_time', type: 'numeric' },
        { title: 'Price', field: 'price', type: 'numeric' }
    ]
    const title = "Product"

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('product')
                .select(`*`)
            if(data){
                let final=[]
                data.forEach(elem=>{
                    elem.productDetail= <div style={{display:"flex",alignItems:"center"}}><img src={"https://kgbtzpfzpiujvhawuxcu.supabase.in/storage/v1/object/public/images/" + elem.image_url} width="50px" height="50px" style={{ margin: " 10px 10px", borderRadius: "50%" }} />

                    <p style={{ flexGrow: "1" }}>{elem.name}</p></div>
                    
                    elem.production_time = <div>{elem.production_time} minutes</div>
                    elem.price = <div><i className="fal fa-rupee-sign"/> {elem.price}</div>

                    final.push(elem)
                })
                setTableData(final)
                console.log(final)
            }
        }
        catch{
            alert(error.message)
        }
    }

    if(tableData)
    return (
        <div>

            <Layout>
                <div style={{ width: '80vw', maxHeight: 'var(--container-height)' }}>
                    <Table columns={columns} data={tableData} title={title}></Table>
                </div>

            </Layout>
        </div>
    )
    else
    return(
        <div>
            <Layout>

            </Layout>
        </div>
    )
}


export default table