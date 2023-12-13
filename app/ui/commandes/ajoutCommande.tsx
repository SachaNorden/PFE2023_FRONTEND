'use client';
import {Form, Image, Input, message, Popconfirm} from "antd";
import {Button} from "@/app/ui/button";
import {
    addCommande,
    addLigneCommande,
    deleteCommande,
    getCommandeByClientId,
    getCommandeIdDuClientId,
    updateCommande
} from "@/lib/api";
import Link from "next/link";
import {useEffect, useState} from "react";
import {wait} from "next/dist/lib/wait";

function AjoutCommande() {
    const [form] = Form.useForm();
    const [clientId, setClientId] = useState();
    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
    const [commandeId, setCommandeId] = useState();
    const [isExisting, setIsExisting] = useState(false);

    useEffect(() => {
        const currentUrl = window.location.href;
        const parts = currentUrl.split('/');
        const id = parts[parts.length - 1];
        setClientId(id);
        const fetchCommandeDetails = async () => {
            getCommandeIdDuClientId(clientId)
                .then((result) => {
                    setCommandeId(result[0]);
                });
            getCommandeByClientId(clientId)
                .then((commandeDetails) => {
                    if (commandeDetails) {
                        form.setFieldsValue({
                            champ1: commandeDetails.find(item => item.article === 1)?.quantite || 0,
                            champ2: commandeDetails.find(item => item.article === 2)?.quantite || 0,
                            champ3: commandeDetails.find(item => item.article === 3)?.quantite || 0,
                            champ4: commandeDetails.find(item => item.article === 4)?.quantite || 0,
                            champ5: commandeDetails.find(item => item.article === 5)?.quantite || 0,
                        });
                        const sum = commandeDetails.reduce((total, item) => total + item.quantite, 0);
                        setIsExisting(sum != 0);
                    }
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des détails de la commande:", error);
                });
        };
        if (clientId) fetchCommandeDetails();
    }, [clientId]);

    const handleDelete = async () => {
        try {
            await deleteCommande(commandeId);
            message.success("Commande supprimé avec succès");
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
            ];
            await updateCommande(commandeId, articles);
            message.success("Commande mise à jour avec succès");
            wait(1000);
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la commande:", error);
        }
    }

    const handleSubmit = async () => {
        try {
            await addCommande(clientId);
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
            await addLigneCommande(commandeId, articles);
            message.success("Commande ajoutée");
        } catch (error) {
            console.error("Erreur lors de l'ajout de la commande");
        }
    };

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <Image width={65} src="/Snappies-Logo.png" preview={false} className=""/>
            {isAdmin ? (
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
                        </Link>
                        {isExisting ? (
                            <>
                                <Popconfirm
                                    title="Êtes-vous sûr de vouloir supprimer cette commande ?"
                                    onConfirm={handleDelete}
                                    okText="Oui"
                                    cancelText="Non"
                                >
                                    <Button
                                        style={{background: 'red', borderColor: 'grey', color: 'white'}}>Supprimer</Button>
                                </Popconfirm>
                                <Button type='primary' onClick={handleUpdate}>Modifier</Button>
                            </>
                        ) : (
                            <Button type='submit'>Enregistrer</Button>
                        )}
                    </div>
                </Form>
            ) : (
                <div>
                    <div>Vous n'avez pas accès à cette page, veuillez contacter l'administrateur.</div>
                </div>
            )}

        </div>
    );
}

export default AjoutCommande;
