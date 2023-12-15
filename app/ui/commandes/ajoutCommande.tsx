'use client';
import {Form, Image, Input, message, Popconfirm} from "antd";
import {Button} from "@/app/ui/button";
import {
    addCommande,
    addLigneCommande,
    deleteCommande, getClientById,
    getCommandeByClientId,
    getCommandeIdDuClientId,
    updateCommande
} from "@/lib/api";
import Link from "next/link";
import {useEffect, useState} from "react";
import {wait} from "next/dist/lib/wait";
import MenuDer from "@/app/ui/menu/menu";

interface Client {
    id: string,
    nom: string,
    adresse_complete: string,
}

function AjoutCommande() {
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;

    const [form] = Form.useForm();
    const [commandeId, setCommandeId] = useState();
    const [isExisting, setIsExisting] = useState(false);
    const [client, setClient] = useState<Client>();
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        if (clientId !== '' && client == null) {
            getClientById(clientId).then(cli => {
                setClient(cli)
            }, reason => {
                console.error(reason);
            }).catch(reason => console.error(reason));
        }
    }, [client, clientId]);

    useEffect(() => {
        const fetchCommandeDetails = async () => {
            try {
                const clientId = window.location.href.split('/').pop();
                let result = '';
                let idComm = '';
                let commandeDetails = null;
                let clientData = null;
                if (typeof clientId === "string") result = await getCommandeIdDuClientId(clientId);
                if (result[0] !== undefined) {
                    // @ts-ignore
                    setCommandeId(result[0]);
                } else {
                    if (typeof clientId === "string") idComm = await addCommande(clientId);
                    // @ts-ignore
                    setCommandeId(idComm);
                }
                if (typeof clientId === "string") {
                    commandeDetails = await getCommandeByClientId(clientId);
                }

                if (commandeDetails) {
                    form.setFieldsValue({
                        champ1: commandeDetails.find((item: { article: number; }) => item.article === 1)?.quantite || 0,
                        champ2: commandeDetails.find((item: { article: number; }) => item.article === 2)?.quantite || 0,
                        champ3: commandeDetails.find((item: { article: number; }) => item.article === 3)?.quantite || 0,
                        champ4: commandeDetails.find((item: { article: number; }) => item.article === 4)?.quantite || 0,
                        champ5: commandeDetails.find((item: { article: number; }) => item.article === 5)?.quantite || 0,
                        champ6: commandeDetails.find((item: { article: number; }) => item.article === 6)?.quantite || 0,
                    });
                    const sum = commandeDetails.reduce((total: any, item: { quantite: any; }) => total + item.quantite, 0);
                    setIsExisting(sum !== 0);
                }
                if (typeof clientId === "string") clientData = await getClientById(clientId);
                setClient(clientData);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de la commande:", error);
            }
        };

        fetchCommandeDetails();
    }, [form, isExisting]);

    const handleDelete = async () => {
        try {
            // @ts-ignore
            await deleteCommande(commandeId);
            message.success("Commande supprimé avec succès");
            await wait(1000);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la suppression de la commande");
        }
    };

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
            await updateCommande(clientId, articles);
            message.success("Commande mise à jour avec succès");
            wait(1000);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la commande:", error);
        }
    }

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const articles = [
                {article: 1, quantite: values.champ1 || 0,},
                {article: 2, quantite: values.champ2 || 0,},
                {article: 3, quantite: values.champ3 || 0,},
                {article: 4, quantite: values.champ4 || 0,},
                {article: 5, quantite: values.champ5 || 0,},
                {article: 6, quantite: values.champ6 || 0,},
            ];
            // @ts-ignore
            await addLigneCommande(commandeId, articles);
            message.success("Commande ajoutée");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la commande");
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            {isAdmin ? (
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
                >
                    <p className="text-4xl flex flex-col justify-center items-center">
                        Commande {client && client.nom ? `pour ${client.nom}` : ''}
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
                            rules={[{ required: true, message: "Veuillez saisir la quantité pour Inserts" }]}
                            required
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='mb-6'>
                        <Form.Item
                            label="Sac-poubelles"
                            name="champ5"
                            rules={[{ required: true, message: "Veuillez saisir la quantité pour Sac-poubelles" }]}
                            required
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='mb-6'>
                        <Form.Item
                            label="Gants de toilette"
                            name="champ6"
                            rules={[{ required: true, message: "Veuillez saisir la quantité pour Gants de toilette" }]}
                            required
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className='flex items-center justify-between'>
                        <Link href={`/clients/`}>
                            <Button>Retour</Button>
                        </Link>
                        <Popconfirm
                            title="Êtes-vous sûr de vouloir supprimer cette commande ?"
                            onConfirm={handleDelete}
                            okText="Oui"
                            cancelText="Non"
                        >
                            <Button
                                style={{background: 'red', borderColor: 'grey', color: 'white'}}>Supprimer</Button>
                        </Popconfirm>
                        <Button type='submit' onClick={handleUpdate}>Modifier</Button>
                    </div>
                </Form>
            ) : (
                <div>
                    <div>Vous n avez pas accès à cette page, veuillez contacter l administrateur.</div>
                </div>
            )}

        </div>
    );
}

export default AjoutCommande;
