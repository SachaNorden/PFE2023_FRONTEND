import CommandeItineraire from "@/app/ui/commandes/commandeItineraire";
import {useEffect, useState} from "react";
import {getUserById} from "@/lib/api";

interface Livreur {
    id: string;
    username: string;
    isAdmin: boolean;
}

interface Itineraire {
    id: string;
    status: string;
    livreur: string;
    clients: any[];
}

const getStatusColorClass = (status: string) => {
    switch (status) {
        case 'En cours':
            return 'text-xl text-green-500 font-bold';
        case 'Livré':
            return 'text-xl text-red-500 font-bold';
        case 'En attente':
            return 'text-xl text-gray-400 font-bold font-bold';
        default:
            return 'text-xl text-gray-400 font-bold';
    }
};

function Itineraire({itine}: { itine: Itineraire }) {
    const [livreur, setUser] = useState<Livreur | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserById(itine.livreur);
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [itine.livreur]);

    if (!itine) {
        return null;
    }

    return (
        <div className='fmb-4'>
            <p className="text-base">
                <b className="text-xl">Itinéraire {itine.id}</b>
                <span className={getStatusColorClass(itine.status)}>{itine.status}</span>
            </p>
            {livreur && <p className="text-base">{livreur.username}</p>}
            <br/>
            {itine.clients && (
                itine.clients.map((client: any) => (
                    <div className='flex items-center justify-between flex-grow' key={client.id}>
                        <CommandeItineraire client={client} itine={itine}/>
                    </div>
                ))
            )}
        </div>
    );
}

export default Itineraire;
