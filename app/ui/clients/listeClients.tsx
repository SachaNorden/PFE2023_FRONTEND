import ClientCard from "@/app/ui/clients/clientCard";
import { Key } from "react";

// @ts-ignore
function ListeClients({clients, onDelete}) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <div className="font-bold">Liste des clients</div>
            {clients.map((client: { id: Key | null | undefined; }) => (
                <ClientCard key={client.id} client={client} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default ListeClients;
