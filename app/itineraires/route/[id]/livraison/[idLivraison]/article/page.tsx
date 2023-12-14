'use client'
import {Form, Image, Input, message, Popconfirm} from "antd";
import {Button} from "@/app/ui/button";
import {
    addLivraison,
    getClientById,
    getLivraionById,
    fetchLivraisonParClient,
    updateLivraison
} from "@/lib/api";
import Link from "next/link";
import {useEffect, useState} from "react";
import {wait} from "next/dist/lib/wait";

interface Client {
    id: string,
    nom: string,
    adresse_complete: string,
}

export default function ArticleLivraison() {

    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;

    const [form] = Form.useForm();
    const [isExisting, setIsExisting] = useState(false);
    const [client, setClient] = useState<Client>();


    const [livraisonId, setLivraisonId] = useState();

    useEffect(() => {
        const fetchLivraisonDetails = async () => {
            try {
                const urlSegments = window.location.href.split('/');
                const clientId = urlSegments[urlSegments.length - 4];


                let livraisonDetails = null;
                let clientData = null;
                const livraisonIdBis = await fetchLivraisonParClient(clientId);
                setLivraisonId(livraisonIdBis[0]);
                if(livraisonId !== undefined) livraisonDetails = await getLivraionById(livraisonId);

                if (livraisonDetails) {
                    form.setFieldsValue({
                        champ1: livraisonDetails.find((item: { article: number; }) => item.article === 1)?.quantite || 0,
                        champ2: livraisonDetails.find((item: { article: number; }) => item.article === 2)?.quantite || 0,
                        champ3: livraisonDetails.find((item: { article: number; }) => item.article === 3)?.quantite || 0,
                        champ4: livraisonDetails.find((item: { article: number; }) => item.article === 4)?.quantite || 0,
                        champ5: livraisonDetails.find((item: { article: number; }) => item.article === 5)?.quantite || 0,
                        champ6: livraisonDetails.find((item: { article: number; }) => item.article === 6)?.quantite || 0,
                    });
                    const sum = livraisonDetails.reduce((total: any, item: {
                        quantite: any;
                    }) => total + item.quantite, 0);
                    setIsExisting(sum !== 0);
                }
                if (typeof clientId === "string") clientData = await getClientById(clientId);
                setClient(clientData);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la livraison:", error);
            }
        };

        fetchLivraisonDetails();
    }, [isExisting, livraisonId]);



    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            const articles = [
                {article: 1, quantite: values.champ1 || 0},
                {article: 2, quantite: values.champ2 || 0},
                {article: 3, quantite: values.champ3 || 0},
                {article: 4, quantite: values.champ4 || 0},
                {article: 5, quantite: values.champ5 || 0},
                {article: 6, quantite: values.champ6 || 0},
            ];
            // @ts-ignore
            await updateLivraison(livraisonId, articles);
            message.success("Livraison mise à jour avec succès");
            wait(1000);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la livraison:", error);
        }
    }



    return (
        <div className="min-h-screen flex flex-col">
            <div className='min-h-screen flex flex-col justify-center items-center'>
                {isAdmin ? (
                    <Form
                        form={form}
                        initialValues={{remember: true}}
                        autoComplete="off"
                        className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
                    >
                        <p className="text-4xl flex flex-col justify-center items-center">
                            Livraison {client && client.nom ? `pour ${client.nom}` : ''}
                        </p>
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
                                label="Inserts"
                                name="champ4"
                                rules={[{required: true, message: "Veuillez saisir la quantité pour Inserts"}]}
                                required
                            >
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className='mb-6'>
                            <Form.Item
                                label="Sac-poubelles"
                                name="champ5"
                                rules={[{required: true, message: "Veuillez saisir la quantité pour Sac-poubelles"}]}
                                required
                            >
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className='mb-6'>
                            <Form.Item
                                label="Gants de toilette"
                                name="champ6"
                                rules={[{
                                    required: true,
                                    message: "Veuillez saisir la quantité pour Gants de toilette"
                                }]}
                                required
                            >
                                <Input/>
                            </Form.Item>
                        </div>
                        <div className='flex items-center justify-between'>
                            <Link href={`/clients/`}>
                                <Button>Retour</Button>
                            </Link>
                            <Button type='submit' onClick={handleUpdate}>Modifier</Button>
                        </div>
                    </Form>
                ) : (
                    <div>
                        <div>Vous n avez pas accès à cette page, veuillez contacter l administrateur.</div>
                    </div>
                )}

            </div>
        </div>
    );
}
