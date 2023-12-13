'use client';
import {Form, Input, message, Popconfirm} from "antd";
import {Button} from "@/app/ui/button";
import {addCommande, addLigneCommande, deleteCommande} from "@/lib/api";
import Link from "next/link";
import {useEffect, useState} from "react";

function AjoutCommande() {
    const [form] = Form.useForm();
    const [clientId, setClientId] = useState();

    useEffect(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const id = parts[parts.length - 1];
        setClientId(id);
    }, []);

    const handleDelete = async () => {
        const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
        const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
        try {
            await deleteCommande(clientId);
            message.success("Commande supprimé avec succès");
        } catch (error) {
            message.error("Erreur lors de la suppression de la commande");
        }
    };

    const handleSubmit = async () => {
        try {
            const data = await addCommande(clientId);
            const id_commande = data.id_commande;
            const values = await form.validateFields();
            const articles = [
                {
                    article: 1,
                    quantite: values.champ1 || 0,
                },
                {
                    article: 2,
                    quantite: values.champ2 || 0,
                },
                {
                    article: 3,
                    quantite: values.champ3 || 0,
                },
                {
                    article: 4,
                    quantite: values.champ4 || 0,
                },
                {
                    article: 5,
                    quantite: values.champ5 || 0,
                },
            ];
            await addLigneCommande(id_commande, articles);
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
                initialValues={{remember: true}}
                autoComplete="off"
                className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
            >
                <p className="text-4xl flex flex-col justify-center items-center">Commande</p>
                <div className='mb-6'>
                    <Form.Item
                        label="Langes S"
                        name="champ1"
                        rules={[{required: true, message: "Veuillez saisir la quantité pour Langes S"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Langes M"
                        name="champ2"
                        rules={[{required: true, message: "Veuillez saisir la quantité pour Langes M"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Langes L"
                        name="champ3"
                        rules={[{required: true, message: "Veuillez saisir la quantité pour Langes L"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Sac-poubelles"
                        name="champ4"
                        rules={[{required: true, message: "Veuillez saisir la quantité pour Sac-poubelles"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Gants de toilette"
                        name="champ5"
                        rules={[{required: true, message: "Veuillez saisir la quantité pour Gants de toilette"}]}
                        required
                    >
                        <Input/>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Link href={`/clients/`}>
                        <Button>Retour</Button>
                    </Link><Popconfirm
                    title="Êtes-vous sûr de vouloir supprimer cette commande ?"
                    onConfirm={handleDelete}
                    okText="Oui"
                    cancelText="Non"
                >
                    <Button style={{marginLeft: 250}}>Supprimer</Button>
                </Popconfirm>
                    <Button type='submit'>Enregistrer</Button>
                </div>
            </Form>
        </div>
    );
}

export default AjoutCommande;
