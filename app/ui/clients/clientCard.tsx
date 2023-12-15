import { Card, Button, Popconfirm, message } from 'antd';
import Link from "next/link";
import { deleteClient } from '@/lib/api';
import {redirect} from "next/navigation";

// @ts-ignore
function ClientCard({ client }) {
    const handleDelete = async () => {
        const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
        const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
        try {
            await deleteClient(client.id);
            message.success("Client supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression du client");
        }
    };

    return (
        <Card title={client.nom} className="m-6" style={{  textAlign: "center" }}>
            <p>Adresse : {client.adresse_complete}</p>
            <Link href={`/clients/${client.id}`}>
                <Button className=" m-4 bottom-0 left-0">
                    Modifier
                </Button>
            </Link>
            <Link href={`/commandes/${client.id}`}>
                <Button>
                    Commande
                </Button>
            </Link>
            <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer ce client?"
                onConfirm={handleDelete}
                okText="Oui"
                cancelText="Non"
            >
                <Button className=" bottom-0 right-0 m-4">Supprimer</Button>
            </Popconfirm>
        </Card>
    );
}

export default ClientCard;
