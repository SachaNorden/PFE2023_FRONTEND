import { Card } from 'antd';
import Link from "next/link";
import {Button} from "@/components/ui/button";

function ClientCard({ client }) {
  return (
    <Card title={client.nom} style={{ width: 500, margin: '16px' }}>
        <p>Adresse : {client.adresse_complete}</p>
        <Link href={`/clients/${client.id}`}>
            <Button type="primary">
                Modifier
            </Button>
        </Link>
    </Card>
  );
}

export default ClientCard;
