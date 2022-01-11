import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function table() {
    const columns = [
        { title: "Name", field: "name", width: 150 },
        { title: "Age", field: "age", align: "left", formatter: "progress" },
        { title: "Favourite Color", field: "col" },
        { title: "Date Of Birth", field: "dob", align: "center" },
        { title: "Rating", field: "rating", align: "center", formatter: "star" },
        { title: "Passed?", field: "passed", align: "center", formatter: "tickCross" }
    ]
    var data = [
        { id: 1, name: "Oli Bob", age: "12", col: "red", dob: "" },
        { id: 2, name: "Mary May", age: "1", col: "blue", dob: "14/05/1982" },
        { id: 3, name: "Christine Lobowski", age: "42", col: "green", dob: "22/05/1982" },
        { id: 4, name: "Brendon Philips", age: "125", col: "orange", dob: "01/08/1980" },
        { id: 5, name: "Margret Marmajuke", age: "16", col: "yellow", dob: "31/01/1999" },
    ];
    return (
        <div>

            <Layout>
                <div className={styles.container}>
                    <h2 style={{ margin: "10px" }}>List of Locations</h2>
                    <ReactTabulator
                        data={data}
                        columns={columns}
                        tooltips={true}
                        layout={"fitData"}
                    />
                </div>
            </Layout>
        </div>
    )
}

export default table