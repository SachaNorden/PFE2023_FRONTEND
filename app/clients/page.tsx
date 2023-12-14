'use client'
import {Image, message} from "antd";
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
            <MenuDer />
            {isAdmin ? (
                <div>
                    <ListeClients clients={clients} onDelete={handleDelete()}/>
                    <AddButton link="/clients/ajouterClient"/>
                </div>
            ) : (
                <div>
                    <div>Vous n'avez pas accès à cette page, veuillez contacter l'administrateur.</div>
                </div>
            )}
            <LogOutButton/>
        </div>
    );
}

export default Clients;
