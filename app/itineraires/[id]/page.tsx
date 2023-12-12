'use client'
import {Menu, Form, Input, Image, Button} from 'antd';// npm install antd
import FormComponent from "@/app/ui/Form.component";
import {fetchClients, fetchCommandes, getCommandeById, getItineraireById} from "@/lib/api";
import {useEffect, useState} from "react";
import Itineraire from "@/app/ui/itineraires/Itineraire";
import MenuDer from "@/app/ui/menu/menuAdmin";
import AddButton from "@/app/ui/addButton";


export default function Itineraires() {
    const [itin, setItineraire] = useState([]);
      useEffect(() => {
           const currentUrl = window.location.href;
           const parts = currentUrl.split('/');
           const itineraireId = parts[parts.length - 1];
           const fetchData = async () => {
               try {
                   const data = await getItineraireById(itineraireId);
                   setItineraire(data);
               } catch (error) {
                   console.error(error.message);
               }
           };
           fetchData();
       }, []);

    return (
        <div className='min-h-screen flex flex-col '>

            <MenuDer></MenuDer>

            <p className="text-3xl flex flex-col justify-center items-center">Détails Itineraire</p>
            <FormComponent>
                <Itineraire itine={itin}/>

                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <br/>

                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <AddButton link="/clients/ajouterClient" />
            </FormComponent>

        </div>
    )
}
