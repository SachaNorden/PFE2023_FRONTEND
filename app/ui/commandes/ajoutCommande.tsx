'use client';
import {Form, Input, message, Popconfirm} from "antd";
import {Button} from "@/app/ui/button";
import {addCommande, getClientById, getCommandeByClientId, getCommandeIdDuClientId, updateCommande} from "@/lib/api";
import Link from "next/link";
import {useEffect, useState} from "react";

interface Client {
    id: string,
    nom: string,
    adresse_complete: string,
}

interface Article {
    article: string,
    quantite: number,
}

interface Commande {
    langesS: number,
    langesM: number,
    langesL: number,
    inserts: number,
    poubelles: number,
    gants: number,
}

const articlesIds = new Map<number, string>([
    [1, "langesS"],
    [2, "langesM"],
    [3, "langesL"],
    [4, "inserts"],
    [5, "poubelles"],
    [6, "gants"],
]);

function AjoutCommande() {

    const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
    const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;

    const [form] = Form.useForm<Commande>();
    const [commandeId, setCommandeId] = useState('');
    const [commandExists, setCommandExists] = useState(false);
    const [clientId, setClientId] = useState('');
    const [client, setClient] = useState<Client|null>(null);
    const [commande, setCommande] = useState<Article[] | null>(null)
    const [deleted, isDeleted] = useState(false);

    useEffect(() => {
        const param = window.location.href.split('/').pop();
        (param !== '' && param !== undefined) && setClientId(param);
    }, []);

    /*
    useEffect(() => {
        if (clientId !== '' && client == null) {
            getClientById(clientId).then(cli => {
                setClient(cli)
            }, reason => {
                console.error(reason);
            }).catch(reason => console.error(reason));
        }
    }, [client, clientId]);
*/

    useEffect(() => {
        if (clientId !== '' && commandeId === '') {
            getCommandeIdDuClientId(clientId).then(data => {
                setCommandeId(data)
            }, err => {
                console.error(err);
            }).catch(err => {
                console.error(err);
            });
        }
    }, [commandeId, clientId]);

    useEffect(() => {
        if (clientId !== '' && commandeId !== '' && commande === null && !commandExists)
            getCommandeByClientId(clientId).then(data => {
                if (data !== null && data.length != 0) {
                    setCommande(data);
                    setCommandExists(true);
                } else {
                    isDeleted(true);
                }
            }, err => {
                console.error(err);
            }).catch(err => {
                console.error(err);
            });
    }, [clientId, commandeId, commande, commandExists]);

    useEffect(() => {
        if (commande !== null && commande.length != 0) {
            commande.map(({article, quantite}) => {
                if (quantite !== 0) setCommandExists(true);
                form.setFieldValue(articlesIds.get(Number(article)), quantite);
            });
        } else if (commande === null || commande.length == 0) {
            form.setFieldsValue({
                langesS: 0,
                langesM: 0,
                langesL: 0,
                inserts: 0,
                poubelles: 0,
                gants: 0,
            })
        }
    }, [commande, form]);

    useEffect(() => {
        if (clientId !== '' && deleted) {
            addCommande(clientId).then(comId => {
                setCommandeId(comId)
                isDeleted(false);
            }, err => {
                console.error(err);
            }).catch(err => {
                console.error(err);
            })
        }
    }, [clientId, deleted]);

    const handleDelete = async () => {
        const articles = [
            {article: 1, quantite: 0},
            {article: 2, quantite: 0},
            {article: 3, quantite: 0},
            {article: 4, quantite: 0},
            {article: 5, quantite: 0},
            {article: 6, quantite: 0},
        ];
        updateCommande(clientId, articles).then(value => {
            message.success("Commande supprimée avec succès");
            setCommandExists(false);
            setCommande(null);
        }, err => {
            console.error(err);
        });
    };

    const handleUpdate = async () => {
        form.validateFields().then(values => {
            const articles = [
                {article: 1, quantite: values.langesS},
                {article: 2, quantite: values.langesM},
                {article: 3, quantite: values.langesL},
                {article: 4, quantite: values.inserts},
                {article: 5, quantite: values.poubelles},
                {article: 6, quantite: values.gants},
            ];
            // @ts-ignore
            updateCommande(clientId, articles).then(value => {
                message.success("Commande mise à jour avec succès");
                setCommandExists(false);
            }, err => {
                console.error(err);
            });
        });
    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            {isAdmin ? (
                <Form
                    form={form}
                    initialValues={{remember: true}}
                    autoComplete="off"
                    className='p-8 border-2 border-gray-300 rounded-lg shadow-xl bg-white relative z-20'
                >
                    <p className="text-4xl flex flex-col justify-center items-center">
                        Commande {client && client.nom ? `pour ${client.nom}` : ''}
                    </p>
                    <div className='mb-6'>
                        <Form.Item
                            initialValue={0}
                            label="Langes S"
                            name="langesS"
                            rules={[{required: true, message: "Veuillez saisir la quantité pour Langes S"}]}
                            required
                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className='mb-6'>
                        <Form.Item
                            initialValue={0}
                            label="Langes M"
                            name="langesM"
                            rules={[{required: true, message: "Veuillez saisir la quantité pour Langes M"}]}
                            required
                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className='mb-6'>
                        <Form.Item
                            initialValue={0}
                            label="Langes L"
                            name="langesL"
                            rules={[{required: true, message: "Veuillez saisir la quantité pour Langes L"}]}
                            required
                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className='mb-6'>
                        <Form.Item
                            initialValue={0}
                            label="Inserts"
                            name="inserts"
                            rules={[{required: true, message: "Veuillez saisir la quantité pour Inserts"}]}
                            required
                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className='mb-6'>
                        <Form.Item
                            initialValue={0}
                            label="Sac-poubelles"
                            name="poubelles"
                            rules={[{required: true, message: "Veuillez saisir la quantité pour Sac-poubelles"}]}
                            required
                        >
                            <Input/>
                        </Form.Item>
                    </div>
                    <div className='mb-6'>
                        <Form.Item
                            initialValue={0}
                            label="Gants de toilette"
                            name="gants"
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
