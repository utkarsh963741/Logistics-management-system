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
        { title: 'VID', field: 'vid' },
        { title: 'License', field: 'licence' },
        { title: 'Type', field: 'type' },
        { title: 'Capacity', field: 'capacity', type: 'numeric' },
        
    ]
    const title = "Locations"

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('vehicle')
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