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
        { title: 'Name', field: 'name' },
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