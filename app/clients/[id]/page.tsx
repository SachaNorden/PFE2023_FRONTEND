'use client'
import {Image} from "antd";
import ProfilClient from "@/app/ui/clients/profilClient";
import {getClientById} from "@/lib/api";
import {useEffect, useState} from "react";
import LogOutButton from "@/app/ui/logOutButton";
import MenuDer from "@/app/ui/menu/menu";

function Profil() {
    const [client, setclient] = useState([]);
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
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
            <MenuDer />
            {isAdmin ? (
                <ProfilClient client={client}/>
            ) : (
                <div>
                    <div>Vous n'avez pas accès à cette page, veuillez contacter l'administrateur.</div>
                    <LogOutButton/>
                </div>
            )}
        </div>
    );
}

export default Profil;
