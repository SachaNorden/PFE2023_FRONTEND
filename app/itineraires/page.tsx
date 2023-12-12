'use client'
import {Form, Input, Image} from 'antd';
import FormComponent from '@/app/ui/Form.component'
import ListItineraires from '@/app/ui/itineraires/listeItineraire'
import {useEffect, useState} from "react";
import {fetchItineraires, fetchItinerairesFake, fetchItinerairesfake} from "@/lib/api";
import Itineraire from "@/app/ui/itineraires/Itineraire";


function Itineraires( isAdmin =false) {

    // @ts-ignore
    const [itineraires, setItineraires] = useState<Itineraire[]>([]);
    const handleDelete = async () => {
        //const updatedClients = await fetchClients();
        //setClients(updatedClients);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItinerairesFake();
                setItineraires(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    }, );

    return (
        <div className='min-h-screen flex flex-col '>
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=' ' />

            <p className="text-4xl flex flex-col justify-center items-center">Feuilles de routes</p>
            <FormComponent>
                <ListItineraires itineraires={itineraires} isAdmin={isAdmin}></ListItineraires>

                {/* change isAdmin */}
                {!isAdmin && (
                    <Image width={60} src="/plus.png" preview={false} className='absolute -top-21 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5' />)
                }
            </FormComponent>
        </div>
    )
}
export default Itineraires;
