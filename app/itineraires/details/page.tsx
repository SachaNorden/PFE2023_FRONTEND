'use client'
import {Form, Input, Image, Button} from 'antd';

import FormComponent from "@/app/ui/Form.component";

import commandeInItineraire from "@/app/ui/users/profilUser";
import {fetchClients, fetchCommandes, getCommandeById} from "@/lib/api";
import {useEffect, useState} from "react";
import CommandeInItineraire from "@/app/ui/commandes/commandeInItineraire";
import ClientCard from "@/app/ui/clients/clientCard";



export default function Itineraires() {
    const [commandes, setCommande] = useState([]);
    /*const [commande.tsx, setCommande] = useState([]);
  useEffect(() => {
       const currentUrl = window.location.href;
       const parts = currentUrl.split('/');
       const commandeId = parts[parts.length - 1];
       const fetchData = async () => {
           try {
               const data = await getCommandeById(commandeId);
               setCommande(data);
           } catch (error) {
               console.error(error.message);
           }
       };
       fetchData();
   }, []);*/

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchCommandes();
                setCommande(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, [commandes]);


    return (
        <div className='min-h-screen flex flex-col '>
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=' '/>

            <p className="text-3xl flex flex-col justify-center items-center">Détails Itineraire</p>
            <FormComponent >

                <p className="text-base"><b className="text-xl">Itinéraire 2</b> <span
                    className="text-2xl text-green-300 font-bold">EN COURS</span></p>
                <p className="text-base">livreur2.nom</p>
                <br/>
                {commandes.map((commande) => (
                    // eslint-disable-next-line react/jsx-key
                    <CommandeInItineraire commande ={commande} />
                ))}

                <p>---------------------------------</p>
                <p className="text-base text-gray-400">- <b className="text-lg">commande1</b> <span
                    className="text-lg text-red-500 font-bold">FINIE</span></p>
                <p className="text-sm text-gray-400"> creche.adresse</p>
                <p>---------------------------------</p>
                <p className="text-base text-gray-400">- <b className="text-lg">commande2</b> <span
                    className="text-lg text-red-500 font-bold">FINIE</span></p>
                <p className="text-sm text-gray-400"> creche.adresse</p>
                <p>---------------------------------</p>
                <div
                    className="flex items-center justify-between"> {/* Utilisez justify-between pour aligner à droite */}
                    <div>
                        <p className="text-base">
                            - <b className="text-lg">commande3</b> <span className="text-lg text-green-300 font-bold">EN COURS</span>
                        </p>
                        <p className="text-sm"> commande.adresse</p>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Modifier
                    </button>
                </div>
                <p>---------------------------------</p>
                <div
                    className="flex items-center justify-between">
                    <div>
                        <p className="text-base">
                            - <b className="text-lg">commande4</b> <span className="text-lg text-green-300 font-bold">EN COURS</span>
                        </p>
                        <p className="text-sm"> commande.adresse</p>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Modifier
                    </button>
                </div>
                <p>---------------------------------</p>
                <div
                    className="flex items-center justify-between">
                    <div>
                        <p className="text-base">
                            - <b className="text-lg">commande5</b> <span className="text-lg text-green-300 font-bold">EN COURS</span>
                        </p>
                        <p className="text-sm"> commande.adresse</p>
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        Modifier
                    </button>
                </div>
                <p>---------------------------------</p>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <Image width={60} src="/plus.png" preview={false}
                       className='absolute -top-21 left-1/2 transform -translate-x-1/2 -z10 -translate-y-5'/>

            </FormComponent >

        </div>
    )
}
