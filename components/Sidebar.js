import React from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../utils/supabaseClient'
import styles from '../styles/Sidebar.module.css'
import Link from 'next/link'

function Sidebar(props) {
    const router = useRouter()

    async function signOut() {
        await supabase.auth.signOut()
        document.cookie = "Event=;";
        document.cookie = "Session=;";
        router.push('/')
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo_container}>
                <img src="/assets/logo.png" className={styles.logo} alt="" />
            </div>
            <ul className={styles.nav}>
                <Link href='/home'>
                    <li className={styles.nav_item}>
                        <div>
                            <i className='fas fa-home'></i>
                            Home
                        </div>
                    </li>
                </Link>
                <Link href='/product/create'>
                    <li className={styles.nav_item}>
                            <div>
                                <i className='fas fa-box-open'></i>
                                Create Product
                            </div>
                    </li>
                </Link>
                <Link href='/product/add'>
                    <li className={styles.nav_item}>
                            <div>
                                <i className='fas fa-box-open'></i>
                                Add Production
                            </div>
                    </li>
                </Link>
                <li className={styles.nav_item}>
                    <i className='fas fa-clipboard-list'></i>
                    List Products
                </li>
                <Link href='/locations/create'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-map-marker-alt'></i>
                        Create Location
                    </li>
                </Link>
                <Link href='/locations/list'>
                <li className={styles.nav_item}>
                    <i className='fas fa-list-ul'></i>
                    List Locations
                </li>
                
                </Link>
                <Link href='/locations/map'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-globe-africa'></i>
                        Map
                    </li>

                </Link>
                <Link href='/transport/create'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-truck'></i>
                        Add Vehicle
                    </li>
                </Link>
                <li className={styles.nav_item}  >
                    <i className='fas fa-th-list'></i>
                    List Vehicles
                </li>
                <Link href='/retail/create'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-dollar-sign'></i>
                        Add Sales
                    </li>
                </Link>

                <li className={styles.nav_item}>
                    <i className='fas fa-file-invoice-dollar'></i>
                    List Sales
                </li>
            </ul>
            <ul className={styles.nav}>
                <li className={styles.nav_item}>
                    <i className='fas fa-cog'></i>
                    Settings
                </li>
                <li className={styles.nav_item} onClick={signOut}>
                    <i className='fas fa-sign-out-alt'></i>
                    Logout
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
