'use client';
import CommandeItineraire from "@/app/ui/commandes/commandeItineraire";
import {useEffect, useState} from "react";
import {getUserById} from "@/lib/api";

interface Livreur {
    id: string,
    username: string,
    isAdmin: boolean,
}

const getStatusColorClass = (status:string) => {
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

// @ts-ignore
function Itineraire({itine}) {
    const [livreur, setUser] = useState<Livreur>();
    useEffect(() => {
        const fetchData = async () => {
            try {

                const data = await getUserById(itine.livreur);
                setUser(data);
            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };
        fetchData();
    }, [itine.livreur]);

    if (!itine) {
        return null;
    }

    return (
        <div className='fmb-4'>
            <p className="text-base"><b className="text-xl">Itinéraire {itine.id}  </
                <span className={getStatusColorClass(itine.status)}>{itine.status}</span></p>
            <p className="text-base">{livreur.username}</p>
            <br/>
            {itine.clients && (
                itine.clients.map((client: any) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className='flex items-center justify-between flex-grow'>
                        <CommandeItineraire client={client} itine={itine}/>
                    </div>
                ))
            )}

        </div>

    );
}

export default Itineraire;
