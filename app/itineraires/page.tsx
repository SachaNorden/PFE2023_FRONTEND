'use client'
import {Form, Input, Image} from 'antd';
import FormComponent from '@/app/ui/Form.component'
import ListItineraires from '@/app/ui/itineraires/listeItineraire'
import {useEffect, useState} from "react";
import { fetchItineraires} from "@/lib/api";
import MenuDer from '@/app/ui/menu/menuAdmin'



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

            <MenuDer></MenuDer>

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