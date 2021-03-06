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
                {/* <Link href='/home'>
                    <li className={styles.nav_item}>
                        <div>
                            <i className='fas fa-home'></i>
                            Home
                        </div>
                    </li>
                </Link> */}
                <Link href='/locations/map'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-globe-africa'></i>
                        Home
                    </li>
                </Link>
                
                <Link href='/locations/create'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-map-marker-alt'></i>
                        Create Location
                    </li>
                </Link>
                <Link href='/product/create'>
                    <li className={styles.nav_item}>
                            <div>
                                <i className='fas fa-plus-square'></i>
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
                <Link href='/transport/create'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-truck'></i>
                        Add Vehicle
                    </li>
                </Link>
                <Link href='/retail/create'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-scanner'></i>
                        Add Sales
                    </li>
                </Link>

                <br/>

                <Link href='/locations/list'>
                <li className={styles.nav_item}>
                    <i className='fas fa-list-ul'></i>
                    List Locations
                </li>
                
                </Link>
                <Link href='/product/list-products'>
                <li className={styles.nav_item}>
                    <i className='fas fa-ice-cream'></i>
                    List Products
                </li>
                </Link>
                <Link href='/product/list-productions'>
                <li className={styles.nav_item}>
                    <i className='fas fa-clipboard-list'></i>
                    List Productions
                </li>
                </Link>
                

                <Link href='/transport/list'>
                <li className={styles.nav_item}  >
                    <i className='fas fa-th-list'></i>
                    List Vehicles
                </li>
                </Link>
                <Link href='/transport/list-transport'>
                <li className={styles.nav_item}  >
                    <i className='fas fa-th-list'></i>
                    List Transports
                </li>
                </Link>
                <Link href='/retail/inventory'>
                    <li className={styles.nav_item}>
                        <div>
                            <i className='fas fa-inventory'></i>
                            Show Inventory
                        </div>
                    </li>
                </Link>
                
                <Link href='/retail/list'>
                    <li className={styles.nav_item}>
                        <i className='fas fa-dollar-sign'></i>
                        List Sales
                    </li>
                </Link>
            </ul>
            <ul className={styles.nav}>
                {/* <li className={styles.nav_item}>
                    <i className='fas fa-cog'></i>
                    Settings
                </li> */}
                <li className={styles.nav_item} onClick={signOut}>
                    <i className='fas fa-sign-out-alt'></i>
                    Logout
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
