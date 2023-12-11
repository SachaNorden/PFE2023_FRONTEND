import {Button, Card, message, Popconfirm} from 'antd';
import Link from "next/link";
import {deleteArticle} from '@/lib/api';

function ArticleCard({ client: article, onDelete }) {
    const handleDelete = async () => {
        try {
            await deleteArticle(article.id);
            message.success("Article supprimé avec succès");
            onDelete();
        } catch (error) {
            message.error("Erreur lors de la suppression de l'article");
        }
    };

    return (
        <Card title={article.nom} style={{ width: 500, margin: '16px', textAlign: "center" }}>
            <Link href={`/articles/${article.id}`}>
                <Button>
                    Modifier
                </Button>
            </Link>
            <Popconfirm
                title="Êtes-vous sûr de vouloir supprimer cet article?"
                onConfirm={handleDelete}
                okText="Oui"
                cancelText="Non"
            >
                <Button style={{ marginLeft: 250 }}>Supprimer</Button>
            </Popconfirm>
        </Card>
    );
}

export default ArticleCard;
