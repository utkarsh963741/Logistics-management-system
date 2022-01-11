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
                <MapWithNoSSR returnCoordinates={null} posx={12.284529832373737} posy={76.64039565005605}/>
                </div>
            </Layout>
        </div>
    )
}

export default map
