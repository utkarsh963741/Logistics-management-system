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
        { title: 'RTID', field: 'rtid' },
        { title: 'SID', field: 'sid' },
        { title: 'Customer Name', field: 'customer_name'},
        { title: 'Customer Phone No.', field: 'customer_ph_no'},
        { title: 'Product Name', field: 'product.name' },
        { title: 'Quantity', field: 'quantity', type: 'numeric' },
        { title: 'Order Time', field: 'created_at'}
    ]
    const title = "Product"

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('retail')
                .select(`rtid,pid,sid,customer_name,customer_ph_no,quantity,created_at,product(name)`)
            if(data){
                let table = []
                data.forEach(elem=>{
                    let date = new Date(elem.created_at)
                    elem.created_at=date.toLocaleString()
                })
                setTableData(data)
                console.log(data)
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