'use client'
import {Menu, Form, Input, Image, Button, Select} from 'antd';// npm install antd
import FormComponent from "@/app/ui/Form.component";
import {fetchClients, fetchLivraisons, getLivraisonById, getItineraireById} from "@/lib/api";
import {useEffect, useState} from "react";
import Itineraire from "@/app/ui/itineraires/Itineraire";
import MenuDer from "@/app/ui/menu/menu";
import Link from "next/link";
import {PlusOutlined} from "@ant-design/icons";

const {Option} = Select;


export default function Itineraires() {
    const [itin, setItineraire] = useState([]);
    const [livraisons, setLivraisons] = useState<Array<{ id: string; client: { nom: string } }>>([]);

    useEffect(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const itineraireId = parts[parts.length - 1];

        const fetchData = async () => {
            try {
                const data = await getItineraireById(itineraireId);
                setItineraire(data);

                const data1 = await fetchLivraisons();
                setLivraisons(data1);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };

        fetchData();
    }, []);


    return (
        <div className='min-h-screen flex flex-col '>

            <MenuDer/>

            <p className="text-3xl flex flex-col justify-center items-center">Détails Itineraire</p>
            <FormComponent>
                <Itineraire itine={itin}/>

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
                                icon={<PlusOutlined/>}
                                style={{backgroundColor: '#52c41a', border: 'none'}}
                            />
                            <Select placeholder="Ajouter un Client" allowClear>
                                {livraisons.length > 0 && livraisons.map(livraison => (
                                    <Option key={livraison.id} value={livraison.id}>
                                        {livraison.client.nom}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        <Button htmlType='submit'>
                            Ajouter
                        </Button>
                    </Form.Item>
                </div>
            </FormComponent>

        </div>
    )
}
