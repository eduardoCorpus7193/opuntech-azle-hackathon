import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import UnLogged from './components/UnLogged';
import Logged from './components/Logged';
import Error from './components/Error';
import { useRestActor } from "@bundly/ares-react";
import '../app/index.css';

export default function IcConnectPage() {
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean | null>(null);
    const backend = useRestActor("backend"); // Llamada al hook directamente en el cuerpo del componente

    useEffect(() => {
        async function checkLoginStatus() {
            try {
                const response : any = await backend.get("/whoami"); // Usando el hook directamente aquí
                
                const userKey = response.data.__principal__;
                if (userKey.length < 10) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error({ error });
                setIsLoggedIn(null); // Manejar el error estableciendo isLoggedIn en false
            }
        }

        checkLoginStatus();
    }, [backend]); // Agregamos backend a la lista de dependencias de useEffect

    console.log(isLoggedIn);

    return (
        <div className='Container1'>
            <Header />
            <div className='Loggedin'>
            {isLoggedIn === null ? <Error /> : isLoggedIn ? <Logged /> : <UnLogged />}
            </div>
        </div>
    );
}
