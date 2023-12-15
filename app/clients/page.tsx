'use client'
import {fetchClients} from "@/lib/api";
import {useEffect, useState} from "react";
import ListeClients from "@/app/ui/clients/listeClients";
import AddButton from "@/app/ui/addButton";
import LogOutButton from "@/app/ui/logOutButton";
import MenuDer from "@/app/ui/menu/menu";

function Clients() {
    const [clients, setClients] = useState([]);
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;

    useEffect(() => {
        try {
            fetchClients().then(data => setClients(data));
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <MenuDer/>
            {isAdmin ? (
                <div>
                    <ListeClients clients={clients}/>
                    <AddButton link="/clients/ajouterClient"/>
                </div>
            ) : (
                <div>
                    <div>Vous n avez pas accès à cette page, veuillez contacter l administrateur.</div>
                </div>
            )}
            <LogOutButton/>
        </div>
    );
}

export default Clients;
