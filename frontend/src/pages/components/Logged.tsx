import { useRestActor } from "@bundly/ares-react";
import React, { useEffect, useState } from 'react';

export default function Logged() {
    const [data, setData] = useState([]);
    const [historial, setHistorial] = useState([]);
    const backend = useRestActor("backend");

    useEffect(() => {
        fetchData();
        fetchHistorial();
    }, []);

    const fetchData = async () => {
        try {
            const response = await backend.get('/getData');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchHistorial = async () => {
        try {
            const response = await backend.get('/getHistorial');
            setHistorial(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    useEffect(() => {
        console.log("Data:", data);
    }, [data]);

    useEffect(() => {
        console.log("Historial:", historial);
    }, [historial]);

    return (
        <div>
            <h1>Nopal</h1>
            <div>
                <h2>Data:</h2>
                <ul>
                    {data.map((d, index) => (
                        <li key={index}>
                            {d.city} - {d.stars} stars - ${d.price}
                        </li>
                    ))}
                </ul>
                <h2>Historial:</h2>
                <ul>
                    {historial.map((d, index) => (
                        <li key={index}>
                            {d.id} - {d.hour} - {d.success === true ? 'Yes' : 'No' }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
