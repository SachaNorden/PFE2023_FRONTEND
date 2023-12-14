'use client';
import {Button} from "@/app/ui/button";
import {addItineraire, fetchLivraisons, fetchUsers} from "@/lib/api";
import Link from "next/link";
import {Form, message, Select} from "antd";
import {useEffect, useState} from "react";

const {Option} = Select;

interface Commande {
    id: string,
    client: Client,
    date_commande: string,
}

interface Client {
    id: string,
    nom: string,
    adresse_complete: string;
}

interface User {
    id: string,
    username: string,
    isAdmin: boolean,
}

function AjoutItineraire() {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            await addItineraire(values.commandes, values.users, values.status);
            message.success("Iitneraire ajouté");
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'itinéraire");
        }
    };

    const [commandes, setCommandes] = useState<Commande[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchLivraisons();
                setCommandes(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    },);

    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    },);


    return (
        <div className='min-h-screen flex flex-col justify-center items-center  '>
            <Form
                form={form}
                onFinish={handleSubmit}
                initialValues={{remember: true}}
                autoComplete="off"
                className='
                  p-8
                  border-2 border-gray-300
                  rounded-lg
                  shadow-xl
                  bg-white
                  relative
                  z-20'
            >
                <p className="text-4xl flex flex-col justify-center items-center">Ajouter Itinéraire</p>
                <br/>
                <div className='mb-4'>
                    <Form.Item
                        label="Commandes"
                        name="commandes"
                        rules={[{required: true, message: "Veuillez sélectionner la commande"}]}
                        required
                    >
                        <Select placeholder="Sélectionner une commande" allowClear>
                            {commandes.map(commande => (
                                <Option key={commande.id} value={commande.id}>
                                    {commande.client.nom} {/* Assurez-vous d'adapter cela en fonction de la structure de vos commandes */}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Livreur"
                        name="livreur"
                        rules={[{required: true, message: "Veuillez sélectionner le livreur"}]}
                        required
                    >
                        <Select placeholder="Sélectionner un livreur" allowClear>
                            {users.map(user => (
                                <Option key={user.id} value={user.id}>
                                    {user.username} {/* Assurez-vous d'adapter cela en fonction de la structure de vos utilisateurs */}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className='mb-6'>
                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{required: true, message: "Veuillez sélectionner le statut"}]}
                        required
                    >
                        <Select placeholder="Sélectionner un statut" allowClear>
                            <Option value="En attente">En attente</Option>
                            <Option value="En cours">En cours</Option>
                            <Option value="Fini">Fini</Option>
                        </Select>
                    </Form.Item>
                </div>
                <div className='flex items-center justify-between'>
                    <Button type='submit'>
                        Enregistrer
                    </Button>
                    <Link href={`/itineraires/`}>
                        <Button>
                            Retour
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export default AjoutItineraire;
