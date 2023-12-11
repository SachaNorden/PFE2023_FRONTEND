'use client'
import {Image} from "antd";
import {fetchClients} from "@/lib/api";
import {useEffect, useState} from "react";
import ListeClients from "@/app/ui/clients/listeClients";
import AddButton from "@/app/ui/addButton";
import {useAuth} from "@/app/contexts/AuthContext";

function Clients() {
    const {isAdmin} = useAuth();
    const [clients, setClients] = useState([]);
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
    }, );

    return (
        <div className="min-h-screen flex flex-col">
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ListeClients clients={clients} onDelete={handleDelete()}/>
            <AddButton link="/clients/ajouterClient" />
            {isAdmin ? (
                <div>
                    <p>Admin</p>
                </div>
            ) : (
                <div>
                    <p>Livreur</p>
                </div>
            )}
        </div>
    );
}

export default Clients;
