'use client'
import {Image} from "antd";
import {fetchClients} from "@/lib/api";
import {useEffect, useState} from "react";
import ListeClients from "@/components/clients/listeClients";
import AddButton from "@/components/ui/addButton";

function Clients() {
    const [clients, setClients] = useState([]);
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
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            <ListeClients clients={clients}/>
            <AddButton link="/clients/ajouterClient" />
        </div>
    );
}

export default Clients;
