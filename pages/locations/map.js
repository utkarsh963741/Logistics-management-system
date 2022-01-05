import React from 'react'
import Layout from '../../components/Layout'
import styles from '../../styles/Form.module.css'
import { supabase } from '../../utils/supabaseClient'
import { useRouter } from 'next/router'

function map() {
    return (
        <div>
            <Layout>
                <iframe id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.535196787511!2d76.63861834894139!3d12.279702091269774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf6557fa108691%3A0x46335fbd1b32437e!2sNIE%20Diamond%20Jubilee%20Block!5e0!3m2!1sen!2sin!4v1640772392044!5m2!1sen!2sin" 
                style={{height:"calc(100vh - var(--navbar-height))",width:"100vw",border:"none"}}></iframe>
            </Layout>
        </div>
    )
}

export default map
