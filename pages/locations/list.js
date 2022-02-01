import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import Table from '../../components/Table'
import Link from 'next/link'


function table() {

    const [tableData,setTableData]=useState(null)

    useEffect(()=>{
        fetchData();
    },[])

    
    const columns = [
        { title: 'EID', field: 'eid' },
        { title: 'Type', field: 'type' },
        { title: 'Status', field: 'status' },
        { title: 'Max Capacity', field: 'capacity', type: 'numeric' },
        { title: 'Current Inventory', field: 'curr_capacity', type: 'numeric' },
        { title: 'Latitude', field: 'latitude', type: 'numeric' },
        { title: 'Longitude', field: 'longitude', type: 'numeric' },
        { field: 'test' },
    ]
    const title = "Locations"

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('establishment')
                .select(`*,inventory(*)`)
            if(data){
                var datafin=[]
                data.forEach(element => {
                    let sum =0
                    element.inventory.forEach(val=>{
                        sum+=val.quantity_left
                    })
                    let temp = element
                    temp.curr_capacity = sum
                    temp.test = <Link href={"/locations/"+element.eid}><a><i className='fal fa-external-link'></i></a></Link>
                    console.log(temp)
                    datafin.push(temp)
                });
                setTableData(datafin)
                console.log(datafin)
            }
        }
        catch(e){
            console.log(e)
        }
    }

    if(tableData)
    return (
        <div>

            <Layout>
                <div style={{ width: '80vw', maxHeight: 'var(--container-height)' ,overflow:"hidden",overflowY:"scroll"}}>
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