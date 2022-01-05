import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'

function Home() {
    const [profile, setProfile] = useState(null)
    const [imageData, setImageData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        fetchProfile()
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchProfile() {
        try {
            const profileData = await supabase.auth.user()

            if (!profileData) {
                router.push('/')
            } else {
                // console.log(profileData)
                setProfile(profileData)   
            }

        } catch (error) {
            alert(error.message)
            router.push('/')
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        router.push('/')
    }

    async function fetchData() {
        try {
            const { data, error } = await supabase
            .from('Images')
            .select()

            if(data)
            {
                console.log(data)
                setImageData(data)
            }

        } catch (error) {
            alert(error.message)
            router.push('/')
        }
    }


    if (!profile) return null
    return (
        <>
            <Layout>
                {/* <iframe id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.535196787511!2d76.63861834894139!3d12.279702091269774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf6557fa108691%3A0x46335fbd1b32437e!2sNIE%20Diamond%20Jubilee%20Block!5e0!3m2!1sen!2sin!4v1640772392044!5m2!1sen!2sin" 
                style={{height:"calc(100vh - var(--navbar-height))",width:"100vw",border:"none"}}></iframe> */}
            </Layout>

        </>
    )
}

export default Home
