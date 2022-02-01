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
        { title: 'TID', field: 'tid' },
        { title: 'From', field: 'from' },
        { title: 'To', field: 'to' },
        { title: 'Product', field: 'product-details.name'},
        { title: 'Quantity', field: 'quantity'},
        { title: 'Vehicle ID', field: 'vid'},
        { title: 'Status', field: 'status'},
        
    ]
    const title = "Transports"

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('transport')
                .select(`*,product-details:product(*)`)
            if(data){
                let final = []
                data.forEach(elem=>{
                    elem.status = elem.status=="completed"?
                        <div style={{background:"var(--color-bg-primary)",width:"fit-content",padding:"5px 20px",borderRadius:'30px'}}> <i className="fas fa-circle" style={{color:"green"}}></i> {elem.status} </div>
                        :
                        <div style={{background:"var(--color-bg-primary)",width:"fit-content",padding:"5px 20px",borderRadius:'30px'}}><i className="fas fa-circle" style={{color:"blue"}}></i> {elem.status} </div>
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