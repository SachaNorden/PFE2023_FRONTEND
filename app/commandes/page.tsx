'use client'
import {Image, message} from "antd";
import {fetchCommandes} from "@/lib/api";
import {useEffect, useState} from "react";
import AddButton from "@/app/ui/addButton";
import LogOutButton from "@/app/ui/logOutButton";
import ListeCommandes from "@/app/ui/commandes/listeCommandes";

function Commandes() {
    const [commandes, setCommandes] = useState([]);
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const handleDelete = async () => {
        //const updatedClients = await fetchClients();
        //setClients(updatedClients);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCommandes();
                setCommandes(data);
            } catch (error) {
                message.error(error.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {isAdmin ? (
                <div>
                    <p>Admin</p>
                </div>
            ) : (
                <div>
                    <p>Livreur</p>
                </div>
            )}
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ListeCommandes commandes={commandes} onDelete={handleDelete()}/>
            <AddButton link="/commandes/ajouterCommande"/>
            <LogOutButton/>
        </div>
    );
}

export default Commandes;
