import React, { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/router'
import dynamic from "next/dynamic";

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Layout from '../components/Layout'


function Home() {

    const MapWithNoSSR = dynamic(() => import("../components/Map"), {
        ssr: false
      })

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
                <div id="map" style={{ height: "100%", width: "100%" }}>
                    <MapWithNoSSR returnCoordinates={null} posx={12.284529832373737} posy={76.64039565005605}/>
                </div>
            </Layout>

        </>
    )
}

export default Home
