import { Card, Button, Popconfirm, message } from 'antd';
import Link from "next/link";
import { deleteClient } from '@/lib/api';
import {redirect} from "next/navigation";

function ClientCard({ client, onDelete }) {
    const handleDelete = async () => {
        const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
        const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
        try {
            await deleteClient(client.id);
            message.success("Client supprimé avec succès");
            onDelete();
        } catch (error) {
            console.error("Erreur lors de la suppression du client");
        }
    };

    return (
        <Card title={client.nom} style={{ width: 500, margin: '16px', textAlign: "center" }}>
            <p>Adresse : {client.adresse_complete}</p>
            <Link href={`/clients/${client.id}`}>
                <Button>
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
                <Button style={{ background: 'red', borderColor: 'grey', color: 'white' }}>
                    Supprimer
                </Button>
            </Popconfirm>
        </Card>
    );
}

export default ClientCard;
