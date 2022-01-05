import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/Navbar.module.css'
import dynamic from "next/dynamic";
import { supabase } from '../utils/supabaseClient'

const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

function Navbar(props) {

    const [profile, setProfile] = useState(null)
    const router = useRouter()

    const [click, setclick] = useState(false);

    const handleClick = () => {
        setclick(!click)
        props.trigger()
    };
    const closeMenu = () => setclick(false);

    useEffect(() => {
        fetchProfile()
    }, [])

    async function fetchProfile() {
        try {
            const profileData = await supabase.auth.user()

            if (!profileData) {
                router.push('/')
            } 
            else{
                setProfile(profileData)
            }

        } catch (error) {
            alert(error.message)
            router.push('/')
        }
    }

    async function signOut() {
        await supabase.auth.signOut()
        document.cookie = "Event=;";
        document.cookie = "Session=;";
        router.reload(window.location.pathname)
    }

    async function checkUser() {
        /* when the component loads, checks user to show or hide Sign In link */
        const user = await supabase.auth.user()
        if (user) {
            console.log(user)
            router.reload(window.location.pathname)
        }
        else{
            router.push('/')
        }
      }

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar_container}>
                        <div className={styles.navbar_logo}>
                            {/* <img src="/vercel.svg" className={styles.logo} alt=""/> */}
                            <Link href='/account'><p className={styles.navbar_logo_name}>Logistics DBMS</p></Link>
                        </div>

                    <ul className={styles.nav_menu}>
                        <li className={styles.nav_item}>
                            {profile?
                                <div style={{display:'flex',alignItems:'center'}}>
                                    <img style={{width:'30px',marginRight:'10px',borderRadius:'50%'}} 
                                        src={"https://avatars.dicebear.com/api/initials/"+profile.email+".svg"}>
                                    </img>
                                    <p className={styles.uemail} style={{fontSize:'1em'}}>{profile.email}</p>
                                </div>
                                :
                                ''
                            }
                        </li>
                        <li className={styles.nav_item}>
                            {profile?
                                <div className={styles.nav_links} onClick={signOut}>SIGNOUT</div>
                                :
                                <div className={styles.nav_links} onClick={checkUser}>LOGIN</div>
                            }
                        </li>
                        <li>
                            <ThemeToggle/>
                        </li>
                    </ul>
                    <div className={styles.menu_icon} onClick={handleClick}>
                        <i className={click? "fas fa-times" : "fa fa-bars"}></i>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
