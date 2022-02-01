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
        { title: 'PRID', field: 'prid' },
        { title: 'Product Name', field: 'product_name' },
        { title: 'Factory Name', field: 'factory_name'},
        { title: 'Quantity', field: 'quantity', type: 'numeric' },
        { title: 'Expected Completion Time', field: 'expected_completion', type: 'numeric' },
        { title: 'Status', field: 'status' },
    ]
    const title = "Production"

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('production')
                .select(`*,
                product_name:product(name)`)
            if(data){
                let temp= [...data].map((item)=>{
                    
                    item.product_name=item.product_name.name
                    item.factory_name='Factory ID-'+item.fid
                    item.status = item.status=="done"?
                    <div style={{background:"var(--color-bg-primary)",width:"fit-content",padding:"5px 20px",borderRadius:'30px'}}> <i className="fas fa-circle" style={{color:"green"}}></i> {item.status} </div>
                    :
                    <div style={{background:"var(--color-bg-primary)",width:"fit-content",padding:"5px 20px",borderRadius:'30px'}}><i className="fas fa-circle" style={{color:"yellow"}}></i> {item.status} </div>

                    return item
                })
                setTableData(temp)
                console.log(temp)

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