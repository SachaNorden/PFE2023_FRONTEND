'use client'
import {Image} from "antd";
import {fetchClients} from "@/lib/api";
import {useEffect, useState} from "react";
import ListeClients from "@/app/ui/clients/listeClients";
import AddButton from "@/app/ui/addButton";
import LogOutButton from "@/app/ui/logOutButton";

function Clients() {
    const [clients, setClients] = useState([]);
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const handleDelete = async () => {
        //const updatedClients = await fetchClients();
        //setClients(updatedClients);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchClients();
                setClients(data);
            } catch (error) {
                console.error(error.message);
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
            <ListeClients clients={clients} onDelete={handleDelete()}/>
            <AddButton link="/clients/ajouterClient"/>
            <LogOutButton />
        </div>
    );
}

export default Clients;
