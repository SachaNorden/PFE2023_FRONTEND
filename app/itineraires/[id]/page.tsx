'use client'
import {Menu, Form, Input, Image, Button, Select} from 'antd';// npm install antd
import FormComponent from "@/app/ui/Form.component";
import {fetchClients, fetchLivraisons, getLivraisonById, getItineraireById} from "@/lib/api";
import {useEffect, useState} from "react";
import Itineraire from "@/app/ui/itineraires/Itineraire";
import MenuDer from "@/app/ui/menu/menu";
import Link from "next/link";
import {PlusOutlined} from "@ant-design/icons";
const { Option } = Select;


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

    const [livraisons, setLivraisons] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLivraisons();
                setLivraisons(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchData();
    }, );


    return (
        <div className='min-h-screen flex flex-col '>

            <MenuDer />

            <p className="text-3xl flex flex-col justify-center items-center">Détails Itineraire</p>
            <FormComponent>
                <Itineraire itine={itin}/>

                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                <br/>

                <div className='mb-4'>
                    <Form.Item
                        label="Commandes"
                        name="commandes"
                        rules={[{required: true, message: "Ajouter un Client"}]}
                        required
                    >
                        <div className="flex flex-row items-center">
                            <Button
                                type="primary"
                                shape="circle"
                                size="small"
                                icon={<PlusOutlined />}
                                style={{ backgroundColor: '#52c41a', border: 'none' }}
                            />
                            <Select placeholder="Ajouter un Client" allowClear>
                                {livraisons.map(livraison => (
                                    <Option key={livraison.id} value={livraison.id}>
                                        {livraison.client.nom} {/* Assurez-vous d'adapter cela en fonction de la structure de vos livraisons */}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <Button type='submit'>
                            Ajouter
                        </Button>
                    </Form.Item>

                </div>
            </FormComponent>

        </div>
    )
}
