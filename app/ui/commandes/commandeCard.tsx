import {Button, Card, message, Popconfirm} from 'antd';
import Link from "next/link";
import {deleteCommande} from "@/lib/api";

function CommandeCard({commande, onDelete}) {
    const handleDelete = async () => {
        const isAdminFromLocalStorage = typeof window !== 'undefined' && localStorage.getItem('isAdmin');
        const isAdmin = isAdminFromLocalStorage ? isAdminFromLocalStorage === 'true' : false;
        try {
            await deleteCommande(commande.id);
            message.success("Commande supprimé avec succès");
            onDelete();
        } catch (error) {
            message.error("Erreur lors de la suppression de la commande");
        }
    };

    return (
        <Card title={commande.client.nom} style={{width: 500, margin: '16px', textAlign: "center"}}>
            <Link href={`/commandes/${commande.id}`}>
                <Button>
                    Modifier
                </Button>
            </Link>
            <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer cette commande ?"
                onConfirm={handleDelete}
                okText="Oui"
                cancelText="Non"
            >
                <Button style={{marginLeft: 250}}>Supprimer</Button>
            </Popconfirm>
        </Card>
    );
}

export default CommandeCard;
