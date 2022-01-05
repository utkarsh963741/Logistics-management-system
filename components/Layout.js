import React, { useState, useEffect } from 'react';
import Script from 'next/script'
import Sidebar from './Sidebar'
import styles from '../styles/Sidebar.module.css'
import Navbar from './Navbar';

function Layout({children,user}) {
    const [sidebarToogle, setSidebarToogle] = useState(false)

    const toogleSidebar = ()=>{
        setSidebarToogle(!sidebarToogle)
    }

    return (
        <>
        <main style={{display:'flex',height:'100vh',width:'100vw'}}>
            <Navbar trigger={toogleSidebar}/>
            <div className={sidebarToogle?styles.sidebar+' '+styles.sidebar_show:styles.sidebar+' '+styles.sidebar_hide}>
                <Sidebar/>
            </div>
            <div className={styles.children}>
                    {children}
            </div>      
        </main>
        </>
    )
}

export default Layout
