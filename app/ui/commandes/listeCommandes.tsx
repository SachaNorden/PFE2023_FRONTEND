import CommandeCard from "@/app/ui/commandes/commandeCard";

function ListeCommandes({ commandes, onDelete }) {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h1>Liste des commandes</h1>
            {commandes.map((commande) => (
                <CommandeCard key={commande.id} commande={commande} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default ListeCommandes;
