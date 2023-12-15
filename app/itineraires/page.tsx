'use client'
import FormComponent from '@/app/ui/Form.component'
import ListItineraires from '@/app/ui/itineraires/listeItineraire'
import {useEffect, useState} from "react";
import {fetchItineraires} from "@/lib/api";
import MenuDer from '@/app/ui/menu/menu'
import AddButton from "@/app/ui/addButton";
import LogOutButton from "@/app/ui/logOutButton";


function Itineraires() {
    const [itineraires, setItineraires] = useState([]);
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchItineraires();
                setItineraires(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    }, []);

    // @ts-ignore
    return (
        <div className='min-h-screen flex flex-col'>
            <MenuDer/>
            <p className="text-4xl flex flex-col justify-center items-center">Feuilles de routes</p>
            <FormComponent>
                <ListItineraires itineraires={itineraires}></ListItineraires>
                {isAdmin && (
                    <AddButton link="/itineraires/creation"/>
                )}
            </FormComponent>

            <LogOutButton/>
        </div>
    )
}

export default Itineraires;
