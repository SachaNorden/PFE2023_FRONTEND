'use client'
import {Image} from "antd";
import ProfilClient from "@/components/clients/profilClient";
import {getClientById} from "@/lib/api";
import {useEffect, useState} from "react";

function Profil() {
    const [client, setclient] = useState([]);
    useEffect(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const clientId = parts[parts.length - 1];
        const fetchData = async () => {
            try {
                const data = await getClientById(clientId);
                setclient(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ProfilClient client={client}/>
        </div>
    );
}

export default Profil;
