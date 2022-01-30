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
        { title: 'Latitude', field: 'latitude', type: 'numeric' },
        { title: 'Longitude', field: 'longitude', type: 'numeric' },
        { title: 'Capacity', field: 'capacity', type: 'numeric' },
        { title: 'Status', field: 'status' },
        { field: 'test' },
    ]
    const title = "Locations"

    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from('establishment')
                .select(`*`)
            if(data){
                var datafin=[]
                data.forEach(element => {
                    let temp = element
                    temp.test = <Link href={"/locations/"+element.eid}><a><i className='fal fa-external-link'></i></a></Link>
                    console.log(temp)
                    datafin.push(temp)
                });
                setTableData(datafin)
                console.log(datafin)
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