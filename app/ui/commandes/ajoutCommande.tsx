'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/app/ui/button";
import {addCommande, getClientById} from "@/lib/api";
import Link from "next/link";
import {useEffect, useState} from "react";

function AjoutCommande({clientId}) {
    const [form] = Form.useForm();
    const [client, setClient] = useState();

    useEffect(() => {
        getClientById(clientId).then((response) => setClient(response));
    }, []);
    const handleSubmit = async () => {
        try {
            //TODO : en cours envoyer juste un client et la date => push /commande
            const date_commande = new Date().toISOString();
            await addCommande(client, date_commande);
            //TODO  => push /commande/${id}/articles
            const values = await form.validateFields();
            const articles = [
                {
                    article: {
                        id: 1,
                    },
                    quantite: values.champ1 || 0,
                },
                {
                    article: {
                        id: 2,
                    },
                    quantite: values.champ2 || 0,
                },
                {
                    article: {
                        id: 3,
                    },
                    quantite: values.champ3 || 0,
                },
                {
                    article: {
                        id: 4,
                    },
                    quantite: values.champ4 || 0,
                },
                {
                    article: {
                        id: 5,
                    },
                    quantite: values.champ5 || 0,
                },
            ];
            message.success("Commande ajoutée");
        } catch (error) {
            message.error("Erreur lors de l'ajout de la commande");
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{ remember: true }}
                autoComplete="off"
                className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
            >
                <p className="text-4xl flex flex-col justify-center items-center">Ajouter Commande</p>
                <div className='mb-6'>
                    <Form.Item
                        label="Langes S"
                        name="champ1"
                        rules={[{ required: true, message: "Veuillez saisir la quantité pour Langes S" }]}
                        required
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Langes M"
                        name="champ2"
                        rules={[{ required: true, message: "Veuillez saisir la quantité pour Langes M" }]}
                        required
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Langes L"
                        name="champ3"
                        rules={[{ required: true, message: "Veuillez saisir la quantité pour Langes L" }]}
                        required
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Sac-poubelles"
                        name="champ4"
                        rules={[{ required: true, message: "Veuillez saisir la quantité pour Sac-poubelles" }]}
                        required
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Gants de toilette"
                        name="champ5"
                        rules={[{ required: true, message: "Veuillez saisir la quantité pour Gants de toilette" }]}
                        required
                    >
                        <Input />
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type='submit'>Enregistrer</Button>
                    <Link href={`/clients/`}>
                        <Button>Retour</Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export default AjoutCommande;
