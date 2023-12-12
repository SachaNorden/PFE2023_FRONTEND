'use client'
import {Form, Input, Image} from 'antd';
import FormComponent from '@/app/ui/Form.component'
import ListItineraires from '@/app/ui/itineraires/listeItineraire'
import {useEffect, useState} from "react";
import { fetchItineraires} from "@/lib/api";
import { Menu, Dropdown, Button } from 'antd';  // npm install antdµµµµ



function Itineraires() {

    const [itineraires, setItineraires] = useState([]);


    const handleDelete = async () => {
        //const updatedClients = await fetchClients();
        //setClients(updatedClients);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItineraires();
                setItineraires(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, );

    // @ts-ignore
    return (
        <div className='min-h-screen flex flex-col'>
            <div className="flex justify-between items-center">
                <Image width={65} src="/Snappies-Logo.png" preview={false} className=' '/>

                <Menu mode="horizontal">
                    <Menu.Item key="profil">
                        <a href="/profil">Profil</a>
                    </Menu.Item>
                    <Menu.Item key="newItineraire">
                        <a href="/itineraires/creation">Nouvel Itinéraire</a>
                    </Menu.Item>
                    <Menu.Item key="newClient">
                        <a href="/client/creation">Nouveau Client</a>
                    </Menu.Item>
                    <Menu.Item key="newCommande">
                        <a href="/commandes/creation">Nouvelle Commande</a>
                    </Menu.Item>
                    <Menu.Item key="listeClients">
                        <a href="/clients">Liste des Clients</a>
                    </Menu.Item>
                </Menu>
            </div>

            <p className="text-4xl flex flex-col justify-center items-center">Feuilles de routes</p>


            <FormComponent>
                <ListItineraires itineraires={itineraires}></ListItineraires>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image width={60} src="/plus.png" preview={false}
                       className='absolute -top-21 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5'/>
            </FormComponent>

        </div>
    )
}

export default Itineraires;