import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

function map() {

    const MapWithNoSSR = dynamic(() => import("../../components/Map"), {
        ssr: false
      })

    return (
        <div>
            <Layout>
                <div id="map" style={{ height: "100%", width: "100%" }}>
                    <MapWithNoSSR />
                </div>
            </Layout>
        </div>
    )
}

export default map
