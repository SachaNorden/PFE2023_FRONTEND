import ClientCard from "@/app/ui/clients/clientCard";

function ListeClients({ clients, onDelete }) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1>Liste des clients</h1>
            {clients.map((client) => (
                <ClientCard key={client.id} client={client} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default ListeClients;
