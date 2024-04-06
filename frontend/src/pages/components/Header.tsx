import React, { useState } from 'react';
import { AuthButton, useRestActor } from "@bundly/ares-react";

export default function Header() {
    const [refresh, setRefresh] = useState(false);

    const handleAuthButtonClick = async () => {
        try {
            const backend = useRestActor("backend");
            await backend.refreshToken(); // Si tu librería proporciona una función para refrescar el token, úsala aquí
            setRefresh(true); // Establece el estado de refresh en true para recargar la página
        } catch (error) {
            console.error("Error al actualizar el token:", error);
        }
    };

    // Función para renderizar el componente AuthButton y refrescar la página si refresh es true
    const renderAuthButton = () => {
        if (refresh) {
            // Si refresh es true, recarga la página
            window.location.reload();
        } else {
            // Si refresh es false, renderiza el componente AuthButton con el manejador de clic
            return <AuthButton onClick={handleAuthButtonClick} />;
        }
    };

    return (
        <header>
            <div className='ICentry'>
                <p className='Entrytext'>IC Connect</p>
            </div>
            <div className='Authbutton'>
                {/* Renderiza el componente AuthButton */}
                {renderAuthButton()}
            </div>
        </header>
    );
}
