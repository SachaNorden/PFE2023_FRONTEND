'use client';
import {Form, Input, message} from "antd";
import {Button} from "@/app/ui/button";
import {fetchLivraisonParClient, fetchLivraisons, getItineraireById, getLivraionById, updateUser} from "@/lib/api";
import {useEffect, useState} from "react";

// @ts-ignore
const getStatusColorClass = (status) => {
    switch (status) {
        case 'En cours':
            return 'text-sm text-green-500 font-bold';
        case 'Livré':
            return 'text-sm text-red-500 font-bold';
        case 'En préparation':
            return 'text-sm text-gray-500 font-bold';
        default:
            return 'text-sm text-gray-400 font-bold';
    }
};

// @ts-ignore
function CommandeItineraire({client, itine}) {
    const [status, setStatus] = useState<string>();
    const [id, setId] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataId = await fetchLivraisonParClient(client.id);
                const data = await getLivraionById(dataId);

                setId(dataId)
                setStatus(data.status);

            } catch (error) {
                // @ts-ignore
                console.error(error.message);
            }
        };

        fetchData();
    }, [client.id]);
    function handleModifierClick() {
        window.location.href=`/itineraires/route/${client.id}/livraison/${id}/article`
    }

    return (

        <div className='flex items-center mb-4'>
            <div>
                <p>
                    - <b className="text-base">{client.nom ?? 'Non spécifié'}</b>{' '}
                    <p></p>
                    <span className={getStatusColorClass(client.status)}>
                {status ?? 'Non spécifié'}
            </span>
                </p>
                <p className="text-sm text-gray-400"> {client.adresse_complete ?? 'Non spécifiée'}</p>
                <p>---------------------------------</p>
            </div>

            {status !== 'Livré' && (
                <div className='flex items-center justify-between flex-grow'>
                    <Button variant={"blue"} type='submit' onClick={handleModifierClick}>
                        Modifier
                    </Button>
                </div>
            )}
        </div>


    );
}

export default CommandeItineraire;
