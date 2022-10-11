import styles from "./navbar.module.scss"
import logo from "../../assets/logo.svg"
import CreateCertificate from '../Certificate/CreateCertificate';
import ViewCertificates from "../View/ViewCertificates";
import {useState} from "react"
import React from 'react'
import {useEthers} from '@usedapp/core'


function Navbar() {

    const [screen, setScreen] = useState(0)

    const { account, deactivate, activateBrowserWallet } = useEthers()

    return (
    <>
    <header className={styles.header}>
        <img onClick={() => setScreen(0)} className={styles.logo} src={logo}></img>
            <ul className={styles.navlinks}>
                <li  onClick={() => setScreen(0)} >Create</li>
                <li  onClick={() => setScreen(1)}>View</li>
            </ul>
            {!account ? (
                            <button className={styles.buttonConnect} onClick={activateBrowserWallet}>
                            Connect Wallet
                            </button>
                        ) : (
                            <button className={styles.buttonDisconnect} onClick={deactivate}>
                            Disconnect
                            </button>
            )}
    </header>
    {screen === 0 ? <CreateCertificate/> : <></>}
    {screen === 1 ? <ViewCertificates/>: <></>}

    </>
    )
}

export default Navbar