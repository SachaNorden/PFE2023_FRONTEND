import {Button, Card, message, Popconfirm} from 'antd';
import Link from "next/link";
import {deleteUser} from "@/lib/api";

function UserCard({user, onDelete}) {
    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            message.success("Livreur supprimé avec succès");
            onDelete();
        } catch (error) {
            console.error("Erreur lors de la suppression du livreur");
        }
    };

    return (
        <Card title={user.username} style={{width: 500, margin: '16px', textAlign: "center"}}>
            <Link href={`/users/${user.id}`}>
                <Button>
                    Modifier
                </Button>
            </Link>
            <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer ce livreur?"
                onConfirm={handleDelete}
                okText="Oui"
                cancelText="Non"
            >
                <Button style={{marginLeft: 250}}>Supprimer</Button>
            </Popconfirm>
        </Card>
    );
}

export default UserCard;
