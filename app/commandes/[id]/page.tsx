'use client'
import {Image} from "antd";
import ProfilCommande from "@/app/ui/commandes/profilCommande";
import {getCommandeById} from "@/lib/api";
import {useEffect, useState} from "react";

function Profil() {
    const [commandes, setcommandes] = useState([]);
    const currentUrl = window.location.href;
    const parts = currentUrl.split('/');
    const commandeId = parts[parts.length - 1];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCommandeById(commandeId);
                setcommandes(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ProfilCommande commande={commandes}/>
        </div>
    );
}

export default Profil;
