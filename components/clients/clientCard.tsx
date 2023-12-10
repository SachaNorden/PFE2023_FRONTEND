import { Card, Button, Popconfirm, message } from 'antd';
import Link from "next/link";
import { deleteClient } from '@/lib/api';
import {redirect} from "next/navigation";

function ClientCard({ client, onDelete }) {
    const handleDelete = async () => {
        try {
            await deleteClient(client.id);
            message.success("Client supprimé avec succès");
            onDelete();
        } catch (error) {
            message.error("Erreur lors de la suppression du client");
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
            <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer ce client?"
                onConfirm={handleDelete}
                okText="Oui"
                cancelText="Non"
            >
                <Button style={{ marginLeft: 250 }}>Supprimer</Button>
            </Popconfirm>
        </Card>
    );
}

export default ClientCard;
